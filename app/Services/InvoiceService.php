<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\Transaction;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class InvoiceService
{
    /**
     * Generate an official B2B VAT reverse-charge invoice for a transaction.
     */
    public function generateInvoice(Transaction $transaction, ?User $user = null): array
    {
        $user = $user ?? $transaction->user;

        $year = date('Y');
        $uniqueSuffix = strtoupper(Str::random(6));
        $invoiceNumber = "TYG-INV-{$year}-{$uniqueSuffix}";

        $companyConfig = config('services.company', []);
        $companyName = $companyConfig['name'] ?? 'COLCHESTER LTD';
        $companyNumber = $companyConfig['number'] ?? '16113808';
        $companyAddress = $companyConfig['address'] ?? 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP';
        $companyEmail = $companyConfig['email'] ?? 'info@takeyoursgoods.co.uk';

        $invoice = Invoice::create([
            'user_id' => $user->id,
            'transaction_id' => $transaction->id,
            'invoice_number' => $invoiceNumber,
            'amount' => $transaction->amount,
            'currency' => $transaction->currency ?? 'EUR',
            'vat_rate' => 0.00,
            'vat_amount' => 0.00,
            'company_name' => $companyName,
            'company_number' => $companyNumber,
            'company_address' => $companyAddress,
            'company_email' => $companyEmail,
            'client_name' => $user->name,
            'client_company' => $user->company_name,
            'client_vat' => $user->vat_number,
            'client_email' => $user->email,
            'client_address' => $user->billing_address,
            'service_name' => $transaction->service_name,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Generate PDF
        $pdfContent = null;
        try {
            $pdf = Pdf::loadView('invoices.pdf', [
                'invoice' => $invoice,
            ])->setPaper('a4', 'portrait');

            $pdfContent = $pdf->output();
            $storagePath = "invoices/{$invoiceNumber}.pdf";
            Storage::disk('public')->put($storagePath, $pdfContent);

            $invoice->update(['pdf_path' => $storagePath]);
        } catch (\Throwable $e) {
            Log::error('Invoice PDF generation error: ' . $e->getMessage());
        }

        return [
            'invoice' => $invoice,
            'pdf_content' => $pdfContent,
        ];
    }
}
