<?php

namespace App\Http\Controllers;

use App\Mail\ReportReadyEmail;
use App\Models\SourcingReport;
use App\Services\DeepSeekService;
use App\Services\WalletService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class SourcingReportController extends Controller
{
    public function __construct(
        protected WalletService $walletService,
        protected DeepSeekService $deepSeekService
    ) {
    }

    /**
     * Dashboard overview: User's Sourcing Reports and procurement metrics.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();

        $reports = $user->sourcingReports()->latest()->paginate(10);
        $totalReports = $user->sourcingReports()->count();
        $totalSpent = $user->sourcingReports()->sum('cost_deducted');

        return Inertia::render('Dashboard', [
            'wallet_balance' => (float)$user->wallet_balance,
            'reports' => $reports,
            'stats' => [
                'total_reports' => $totalReports,
                'total_spent' => (float)$totalSpent,
                'factories_vetted' => $totalReports * 6,
                'avg_margin_identified' => $totalReports > 0 ? '54.8%' : '58.0%',
            ],
            'company' => config('services.company'),
        ]);
    }

    /**
     * Sourcing Report Creation Wizard.
     */
    public function create(Request $request): Response
    {
        $user = Auth::user();
        $preselectedTier = $request->query('tier', 'pro');

        return Inertia::render('Reports/Create', [
            'wallet_balance' => (float)$user->wallet_balance,
            'initial_tier' => in_array($preselectedTier, ['starter', 'pro', 'enterprise']) ? $preselectedTier : 'pro',
            'company' => config('services.company'),
        ]);
    }

    /**
     * Process Sourcing Report generation and wallet balance deduction.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tier' => 'required|in:starter,pro,enterprise',
            'product_name' => 'required|string|min:3|max:255',
            'product_category' => 'nullable|string|max:255',
            'target_cost' => 'nullable|numeric|min:0.1|max:100000',
            'target_quantity' => 'nullable|integer|min:50|max:1000000',
            'destination_country' => 'required|string|max:100',
            'specifications' => 'nullable|string|max:3000',
            'compliance_requirements' => 'nullable|string|max:1000',
        ]);

        $user = Auth::user();
        $tier = $request->tier;

        $tierCost = match ($tier) {
            'starter' => 149.00,
            'pro' => 499.00,
            'enterprise' => 1499.00,
        };

        $tierName = match ($tier) {
            'starter' => 'Starter Sourcing Report (€149)',
            'pro' => 'Pro Supply Chain Sourcing Report (€499)',
            'enterprise' => 'Enterprise Custom Turnkey Sourcing Pack (€1,499)',
        };

        // Check if user has sufficient funds
        if (!$user->hasSufficientBalance($tierCost)) {
            return redirect()->back()->withErrors([
                'balance' => "Insufficient balance (€" . number_format($user->wallet_balance, 2) . "). Please top up at least €" . number_format($tierCost - (float)$user->wallet_balance, 2) . " to generate this report.",
            ]);
        }

        // Deduct from wallet atomically
        $this->walletService->deduct($user, $tierCost, $tierName, [
            'product_name' => $request->product_name,
            'tier' => $tier,
        ]);

        // Generate AI Report via DeepSeek
        $aiResult = $this->deepSeekService->generateSourcingReport(
            $tier,
            $request->product_name,
            $request->product_category,
            $request->target_cost ? (float)$request->target_cost : null,
            $request->target_quantity ? (int)$request->target_quantity : null,
            $request->destination_country,
            $request->specifications,
            $request->compliance_requirements
        );

        $report = SourcingReport::create([
            'user_id' => $user->id,
            'tier' => $tier,
            'status' => 'completed',
            'title' => $request->product_name . ' Sourcing Dossier',
            'product_name' => $request->product_name,
            'product_category' => $request->product_category ?? 'Consumer Goods / Hardware',
            'target_cost' => $request->target_cost,
            'target_quantity' => $request->target_quantity ?? 1000,
            'destination_country' => $request->destination_country,
            'specifications' => $request->specifications,
            'compliance_requirements' => $request->compliance_requirements,
            'cost_deducted' => $tierCost,
            'report_data' => $aiResult['data'],
            'ai_model' => $aiResult['ai_model'],
        ]);

        // Send confirmation email
        try {
            Mail::to($user->email)->send(new ReportReadyEmail($user, $report));
        } catch (\Throwable $e) {
            Log::warning('Could not send report ready email: ' . $e->getMessage());
        }

        return redirect()->route('reports.show', $report->id)
            ->with('success', "Report successfully generated! €{$tierCost} deducted from your balance.");
    }

    /**
     * Display interactive Sourcing Report.
     */
    public function show(Request $request, SourcingReport $report): Response
    {
        if ($report->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to report.');
        }

        $user = Auth::user();

        return Inertia::render('Reports/Show', [
            'wallet_balance' => (float)$user->wallet_balance,
            'report' => $report,
            'company' => config('services.company'),
        ]);
    }

    /**
     * Download comprehensive Sourcing Report PDF.
     */
    public function downloadPdf(Request $request, SourcingReport $report)
    {
        if ($report->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to report.');
        }

        $pdf = Pdf::loadView('reports.pdf', [
            'report' => $report,
        ])->setPaper('a4', 'portrait');

        $slug = \Illuminate\Support\Str::slug($report->product_name);
        $filename = "TakeYourGoods-Sourcing-Report-{$slug}-#{$report->id}.pdf";

        return $pdf->download($filename);
    }
}
