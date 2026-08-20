<?php

namespace Tests\Feature;

use App\Mail\DocumentPaymentMail;
use App\Mail\ReportReadyEmail;
use App\Mail\WalletTopUpMail;
use App\Mail\WelcomeEmail;
use App\Mail\WelcomeUserMail;
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
            'name' => 'Alexander',
            'surname' => 'Vance',
            'email' => 'alex@vance-logistics.co.uk',
            'company_name' => 'Vance Logistics Ltd',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'phone' => '+44 20 7946 0991',
            'date_of_birth' => '1990-05-15',
            'street_address' => '126 East Ferry Road',
            'city' => 'London',
            'country' => 'United Kingdom',
            'postcode' => 'E14 9FP',
            'terms' => true,
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertDatabaseHas('users', [
            'email' => 'alex@vance-logistics.co.uk',
            'company_name' => 'Vance Logistics Ltd',
            'name' => 'Alexander',
            'surname' => 'Vance',
            'city' => 'London',
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
            'vat_rate' => 0.00,
        ]);

        Mail::assertSent(WalletTopUpMail::class, function ($mail) use ($user) {
            return $mail->user->id === $user->id && count($mail->attachments()) > 0;
        });
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
        Mail::assertSent(DocumentPaymentMail::class, function ($mail) use ($user) {
            return $mail->user->id === $user->id && count($mail->attachments()) > 0;
        });
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
        $otherUser = User::factory()->create(['wallet_balance' => 0]);
        $this->actingAs($user);

        $walletService = app(WalletService::class);
        $topUp = $walletService->topUp($user, 499.00);
        $invoice = $topUp['invoice'];
        $transaction = $topUp['transaction'];

        $invoiceResponse = $this->get(route('invoices.download', $invoice->id));
        $invoiceResponse->assertStatus(200);

        $walletInvoiceResponse = $this->get(route('wallet.invoice', $transaction->id));
        $walletInvoiceResponse->assertStatus(200);

        // Verify other user cannot download this invoice (403)
        $this->actingAs($otherUser);
        $forbiddenResponse = $this->get(route('wallet.invoice', $transaction->id));
        $forbiddenResponse->assertStatus(403);
    }


    public function test_legal_routes_render_successfully(): void
    {
        $this->get(route('terms'))->assertStatus(200);
        $this->get(route('privacy'))->assertStatus(200);
        $this->get(route('refund'))->assertStatus(200);
    }

    public function test_public_pages_and_contact_form(): void
    {
        Mail::fake();

        $this->get(route('how-it-works'))->assertStatus(200);
        $this->get(route('support'))->assertStatus(200);
        $this->get(route('about'))->assertStatus(200);
        $this->get(route('contact'))->assertStatus(200);

        $response = $this->post(route('contact.send'), [
            'name' => 'Alexander Vance',
            'email' => 'alex@vance-logistics.co.uk',
            'subject' => 'Enterprise Custom Sourcing Inquiry',
            'message' => 'We are looking to source 50,000 units of custom ergonomic mechanical keyboards into UK and US warehouses.',
        ]);

        $response->assertSessionHas('success');
        Mail::assertSent(\App\Mail\ContactMessageMail::class, function ($mail) {
            return $mail->name === 'Alexander Vance' && $mail->email === 'alex@vance-logistics.co.uk';
        });
    }
}

