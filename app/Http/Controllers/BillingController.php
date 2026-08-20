<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Services\WalletService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function __construct(protected WalletService $walletService)
    {
    }

    /**
     * Show Billing & Wallet dashboard.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();

        $transactions = $user->transactions()
            ->with('invoice')
            ->paginate(15);

        return Inertia::render('Billing/Index', [
            'wallet_balance' => (float)$user->wallet_balance,
            'transactions' => $transactions,
            'company' => config('services.company'),
            'user_billing' => [
                'name' => $user->name,
                'email' => $user->email,
                'company_name' => $user->company_name,
                'vat_number' => $user->vat_number,
                'billing_address' => $user->billing_address,
            ],
        ]);
    }

    /**
     * Top-up wallet balance.
     */
    public function topUp(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10|max:50000',
            'company_name' => 'nullable|string|max:255',
            'vat_number' => 'nullable|string|max:100',
            'billing_address' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();

        // Update billing info if provided
        if ($request->filled('company_name') || $request->filled('vat_number') || $request->filled('billing_address')) {
            $user->update([
                'company_name' => $request->company_name ?? $user->company_name,
                'vat_number' => $request->vat_number ?? $user->vat_number,
                'billing_address' => $request->billing_address ?? $user->billing_address,
            ]);
        }

        $amount = (float)$request->amount;
        $serviceName = match ((int)$amount) {
            149 => 'Starter Sourcing Package Credits (€149.00)',
            499 => 'Pro Supply Chain Sourcing Credits (€499.00)',
            1499 => 'Enterprise Custom Turnkey Sourcing Credits (€1,499.00)',
            default => 'TakeYourGoods B2B Platform Balance Top-Up (€' . number_format($amount, 2) . ')',
        };

        $result = $this->walletService->topUp($user, $amount, $serviceName, [
            'payment_method' => 'card_checkout',
            'ip' => $request->ip(),
        ]);

        return redirect()->back()->with('success', "Successfully credited €" . number_format($amount, 2) . " to your wallet. B2B Invoice generated.");
    }

    /**
     * Download B2B PDF invoice.
     */
    public function downloadInvoice(Request $request, Invoice $invoice)
    {
        // Authorization check
        if ($invoice->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to invoice.');
        }

        if ($invoice->pdf_path && Storage::disk('public')->exists($invoice->pdf_path)) {
            return response()->download(
                Storage::disk('public')->path($invoice->pdf_path),
                $invoice->invoice_number . '.pdf',
                ['Content-Type' => 'application/pdf']
            );
        }

        // On-the-fly regeneration if file not cached
        $viewName = view()->exists('pdf.wallet_invoice') ? 'pdf.wallet_invoice' : 'invoices.pdf';
        $pdf = Pdf::loadView($viewName, [
            'invoice' => $invoice,
            'transaction' => $invoice->transaction,
            'user' => $invoice->user ?? Auth::user(),
            'invoiceNumber' => $invoice->invoice_number,
        ])->setPaper('a4', 'portrait');

        return $pdf->download($invoice->invoice_number . '.pdf');
    }

    /**
     * Download invoice by transaction model / ID.
     */
    public function downloadInvoiceByTransaction(Request $request, \App\Models\Transaction $transaction)
    {
        // Authorization check
        if ($transaction->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to transaction invoice.');
        }

        $invoice = $transaction->invoice;
        $ref = $invoice?->invoice_number ?? $transaction->reference_number ?? ('INV-' . $transaction->id);

        if ($invoice && $invoice->pdf_path && Storage::disk('public')->exists($invoice->pdf_path)) {
            return response()->download(
                Storage::disk('public')->path($invoice->pdf_path),
                "Invoice_{$ref}.pdf",
                ['Content-Type' => 'application/pdf']
            );
        }

        $viewName = view()->exists('pdf.wallet_invoice') ? 'pdf.wallet_invoice' : 'invoices.pdf';
        $pdf = Pdf::loadView($viewName, [
            'transaction' => $transaction,
            'user' => $transaction->user ?? Auth::user(),
            'invoice' => $invoice,
            'invoiceNumber' => $ref,
        ])->setPaper('a4', 'portrait');

        return $pdf->download("Invoice_{$ref}.pdf");
    }
}

