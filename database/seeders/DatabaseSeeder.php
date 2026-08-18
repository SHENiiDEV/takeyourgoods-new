<?php

namespace Database\Seeders;

use App\Models\SourcingReport;
use App\Models\User;
use App\Services\DeepSeekService;
use App\Services\WalletService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $walletService = app(WalletService::class);
        $deepSeekService = app(DeepSeekService::class);

        // 1. Create Demo User
        $user = User::create([
            'name' => 'Alexander',
            'surname' => 'Vance',
            'email' => 'demo@takeyourgoods.co.uk',
            'password' => Hash::make('password'),
            'phone' => '+44 20 7946 0991',
            'date_of_birth' => '1988-04-12',
            'street_address' => '24 Canary Riverside, Canary Wharf',
            'city' => 'London',
            'country' => 'United Kingdom',
            'postcode' => 'E14 8RS',
            'terms_accepted_at' => now(),
            'company_name' => 'Vance Global Logistics & Commerce Ltd',
            'vat_number' => 'GB394829104',
            'billing_address' => '24 Canary Riverside, Canary Wharf, London, E14 8RS, United Kingdom',
            'wallet_balance' => 0.00,
        ]);


        // 2. Add Top-Up Funds & Generate Official Invoice
        $walletService->topUp(
            $user,
            1499.00,
            'Enterprise Custom Turnkey Sourcing Credits (€1,499.00)'
        );

        $walletService->topUp(
            $user,
            499.00,
            'Pro Supply Chain Sourcing Credits (€499.00)'
        );

        // 3. Generate 2 Sourcing Reports for demo
        $product1Data = $deepSeekService->generateSourcingReport(
            'pro',
            'Smart Ergonomic Active Noise-Cancelling Headphones',
            'Consumer Electronics & Smart Devices',
            12.50,
            2500,
            'United States',
            'Hybrid ANC 40dB, 40mm titanium drivers, matte finish, USB-C, custom retail rigid gift box',
            'CE Marking, FCC Part 15, RoHS 2.0, REACH SVHC, WEEE'
        );

        SourcingReport::create([
            'user_id' => $user->id,
            'tier' => 'pro',
            'status' => 'completed',
            'title' => 'Smart Ergonomic Active Noise-Cancelling Headphones Sourcing Dossier',
            'product_name' => 'Smart Ergonomic Active Noise-Cancelling Headphones',
            'product_category' => 'Consumer Electronics & Smart Devices',
            'target_cost' => 12.50,
            'target_quantity' => 2500,
            'destination_country' => 'United States',
            'specifications' => 'Hybrid ANC 40dB, 40mm titanium drivers, matte finish, USB-C, custom retail rigid gift box',
            'compliance_requirements' => 'CE Marking, FCC Part 15, RoHS 2.0, REACH SVHC, WEEE',
            'cost_deducted' => 499.00,
            'report_data' => $product1Data['data'],
            'ai_model' => $product1Data['ai_model'],
        ]);

        $product2Data = $deepSeekService->generateSourcingReport(
            'starter',
            'Precision Aluminum Magnetic Wireless Charger Stand',
            'Hardware & Accessories',
            6.80,
            1000,
            'United Kingdom',
            'CNC machined aerospace aluminum, MagSafe 15W fast charge, braided nylon cable',
            'CE, UKCA, FCC, Qi2'
        );

        SourcingReport::create([
            'user_id' => $user->id,
            'tier' => 'starter',
            'status' => 'completed',
            'title' => 'Precision Aluminum Magnetic Wireless Charger Stand Sourcing Dossier',
            'product_name' => 'Precision Aluminum Magnetic Wireless Charger Stand',
            'product_category' => 'Hardware & Accessories',
            'target_cost' => 6.80,
            'target_quantity' => 1000,
            'destination_country' => 'United Kingdom',
            'specifications' => 'CNC machined aerospace aluminum, MagSafe 15W fast charge, braided nylon cable',
            'compliance_requirements' => 'CE, UKCA, FCC, Qi2',
            'cost_deducted' => 149.00,
            'report_data' => $product2Data['data'],
            'ai_model' => $product2Data['ai_model'],
        ]);
    }
}

