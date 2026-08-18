<?php

namespace Tests\Feature;

use App\Mail\ReportReadyEmail;
use App\Mail\TopUpSuccessEmail;
use App\Mail\WelcomeEmail;
use App\Models\Invoice;
use App\Models\SourcingReport;
use App\Models\Transaction;
use App\Models\User;
use App\Services\DeepSeekService;
use App\Services\InvoiceService;
use App\Services\WalletService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class TakeYourGoodsTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_registration_dispatches_welcome_email(): void
    {
        Mail::fake();

        $response = $this->post('/register', [
            'name' => 'Alexander Vance',
            'email' => 'alex@vance-logistics.co.uk',
            'company_name' => 'Vance Logistics Ltd',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertDatabaseHas('users', [
            'email' => 'alex@vance-logistics.co.uk',
            'company_name' => 'Vance Logistics Ltd',
            'wallet_balance' => 0.00,
        ]);

        Mail::assertSent(WelcomeEmail::class);
    }

    public function test_wallet_top_up_credits_balance_and_generates_invoice(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'wallet_balance' => 0.00,
            'company_name' => 'Vance Logistics Ltd',
            'vat_number' => 'GB987654321',
        ]);

        $walletService = app(WalletService::class);
        $result = $walletService->topUp($user, 499.00, 'Pro Supply Chain Sourcing Credits (€499.00)');

        $user->refresh();
        $this->assertEquals(499.00, (float)$user->wallet_balance);

        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'type' => 'top_up',
            'amount' => 499.00,
            'service_name' => 'Pro Supply Chain Sourcing Credits (€499.00)',
            'status' => 'completed',
        ]);

        $this->assertDatabaseHas('invoices', [
            'user_id' => $user->id,
            'amount' => 499.00,
            'company_name' => 'COLCHESTER LTD',
            'company_number' => '16113808',
            'vat_rate' => 0.00,
        ]);

        Mail::assertSent(TopUpSuccessEmail::class);
    }

    public function test_sourcing_report_generation_with_balance_deduction(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'wallet_balance' => 600.00,
        ]);

        $this->actingAs($user);

        $response = $this->post(route('reports.store'), [
            'tier' => 'pro',
            'product_name' => 'Wireless Ergonomic Mechanical Keyboard',
            'product_category' => 'Consumer Electronics & Smart Devices',
            'target_cost' => 18.50,
            'target_quantity' => 1500,
            'destination_country' => 'United States',
            'specifications' => 'Gateron Hot-swap switches, Bluetooth 5.3 + 2.4GHz, aluminum frame, PBT keycaps',
            'compliance_requirements' => 'CE, FCC, RoHS 2.0, UN38.3',
        ]);

        $user->refresh();
        $this->assertEquals(101.00, (float)$user->wallet_balance); // 600 - 499 = 101

        $report = SourcingReport::where('user_id', $user->id)->first();
        $this->assertNotNull($report);
        $this->assertEquals('pro', $report->tier);
        $this->assertEquals('completed', $report->status);
        $this->assertArrayHasKey('factories', $report->report_data);
        $this->assertArrayHasKey('unit_economics', $report->report_data);
        $this->assertArrayHasKey('compliance_and_risks', $report->report_data);
        $this->assertArrayHasKey('outreach_templates', $report->report_data);

        $response->assertRedirect(route('reports.show', $report->id));

        Mail::assertSent(ReportReadyEmail::class);
    }

    public function test_insufficient_balance_prevents_report_generation(): void
    {
        $user = User::factory()->create([
            'wallet_balance' => 50.00,
        ]);

        $this->actingAs($user);

        $response = $this->post(route('reports.store'), [
            'tier' => 'pro',
            'product_name' => 'Ergonomic Desk Chair',
            'destination_country' => 'Germany / EU',
        ]);

        $response->assertSessionHasErrors(['balance']);
        $user->refresh();
        $this->assertEquals(50.00, (float)$user->wallet_balance);
        $this->assertEquals(0, SourcingReport::count());
    }

    public function test_invoice_and_report_pdf_downloads(): void
    {
        $user = User::factory()->create(['wallet_balance' => 500]);
        $this->actingAs($user);

        $walletService = app(WalletService::class);
        $topUp = $walletService->topUp($user, 499.00);
        $invoice = $topUp['invoice'];

        $invoiceResponse = $this->get(route('invoices.download', $invoice->id));
        $invoiceResponse->assertStatus(200);

        // Generate report
        $deepSeekService = app(DeepSeekService::class);
        $aiData = $deepSeekService->generateSourcingReport('pro', 'Smart Ring', 'Wearables', 22.00, 1000, 'UK', 'Titanium', 'CE, RoHS');
        $report = SourcingReport::create([
            'user_id' => $user->id,
            'tier' => 'pro',
            'status' => 'completed',
            'title' => 'Smart Ring Dossier',
            'product_name' => 'Smart Ring',
            'destination_country' => 'UK',
            'cost_deducted' => 499.00,
            'report_data' => $aiData['data'],
            'ai_model' => $aiData['ai_model'],
        ]);

        $reportPdfResponse = $this->get(route('reports.pdf', $report->id));
        $reportPdfResponse->assertStatus(200);
    }

    public function test_legal_routes_render_successfully(): void
    {
        $this->get(route('terms'))->assertStatus(200);
        $this->get(route('privacy'))->assertStatus(200);
        $this->get(route('refund'))->assertStatus(200);
    }
}
