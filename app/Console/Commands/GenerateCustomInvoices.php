<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class GenerateCustomInvoices extends Command
{
    protected $signature = 'invoices:generate-custom';
    protected $description = 'Generate official B2B Client and SGS Supplier Invoices in PDF format';

    public function handle(): int
    {
        $this->info('Generating PDF Invoices...');

        $publicDir = public_path('invoices');
        if (!File::exists($publicDir)) {
            File::makeDirectory($publicDir, 0755, true);
        }

        $artifactDir = '/Users/mihailssegins/.gemini/antigravity/brain/289dd752-0c15-4d59-a2c3-fbbfc8c772d1';

        // 1. Client Invoice 1: €1,499.00
        $clientInv1Data = [
            'invoiceNumber' => 'TYG-INV-2026-1499',
            'clientName' => 'Alexandre Dubois',
            'clientCompany' => 'Lumina Retail & Brands SAS',
            'clientAddress' => '18 Rue de la Paix, 75002 Paris, France',
            'clientEmail' => 'procurement@luminabrands.eu',
            'clientVat' => 'FR84920194821',
            'invoiceDate' => date('d M Y', strtotime('-5 days')),
            'paidDate' => date('d M Y', strtotime('-5 days')),
            'currency' => 'EUR',
            'paymentMethod' => 'B2B Corporate Wire Transfer / SEPA',
            'orderRef' => 'TYG-ORD-98421-PRO',
            'items' => [
                [
                    'name' => 'Pro Supply Chain Sourcing & Factory Intelligence Package',
                    'desc' => "• Comprehensive Reverse Landed Cost & Logistics Model (Sea Freight & Air Express)\n• Shortlist & Complete Dossier of 8 Audited Tier-1 Asian Manufacturers\n• Milestone Golden Sample Quality Control (QC) Checklist & ANSI/ASQ Z1.4 Defect Tolerances\n• HS Tariff Code Classification, Customs Duty Mapping & Bilingual RFQ Templates",
                    'qty' => 1,
                    'price' => 1499.00,
                ],
            ],
            'subtotal' => 1499.00,
            'total' => 1499.00,
        ];

        $pdf1 = Pdf::loadView('pdf.client_invoice', $clientInv1Data)
            ->setPaper('a4', 'portrait')
            ->setOption(['isRemoteEnabled' => true, 'defaultFont' => 'Helvetica']);
        
        $path1 = $publicDir . '/Client_Invoice_1499_TYG_COLCHESTER.pdf';
        $pdf1->save($path1);
        if (File::exists($artifactDir)) {
            File::copy($path1, $artifactDir . '/Client_Invoice_1499_TYG_COLCHESTER.pdf');
        }
        $this->info("Generated: $path1");

        // 2. Client Invoice 2: €4,999.00
        $clientInv2Data = [
            'invoiceNumber' => 'TYG-INV-2026-4999',
            'clientName' => 'Marcus Vance',
            'clientCompany' => 'Vance Logistics & Consumer Goods Ltd',
            'clientAddress' => '25 Bank Street, Canary Wharf, London, E14 5JP, United Kingdom',
            'clientEmail' => 'orders@vancelogistics.co.uk',
            'clientVat' => 'GB987654321',
            'invoiceDate' => date('d M Y', strtotime('-2 days')),
            'paidDate' => date('d M Y', strtotime('-2 days')),
            'currency' => 'EUR',
            'paymentMethod' => 'B2B Corporate Wire Transfer / Fast Payment',
            'orderRef' => 'TYG-ORD-98488-TURNKEY',
            'items' => [
                [
                    'name' => 'Turnkey Factory Direct Sourcing & Tooling Feasibility Package',
                    'desc' => "• 18 Audited Tier-1 Manufacturers & Exclusive OEM/ODM Production Lines\n• Custom Mold (Tooling) Feasibility Analysis, Amortization Schedule & CAD Tolerance Blueprint\n• Intellectual Property (IP) Protection & Bilingual NNN / NDA Legal Defense Architecture\n• Multi-Country Sourcing Matrix (China vs. Vietnam) & Senior Engineer Direct Review",
                    'qty' => 1,
                    'price' => 4999.00,
                ],
            ],
            'subtotal' => 4999.00,
            'total' => 4999.00,
        ];

        $pdf2 = Pdf::loadView('pdf.client_invoice', $clientInv2Data)
            ->setPaper('a4', 'portrait')
            ->setOption(['isRemoteEnabled' => true, 'defaultFont' => 'Helvetica']);
        
        $path2 = $publicDir . '/Client_Invoice_4999_TYG_COLCHESTER.pdf';
        $pdf2->save($path2);
        if (File::exists($artifactDir)) {
            File::copy($path2, $artifactDir . '/Client_Invoice_4999_TYG_COLCHESTER.pdf');
        }
        $this->info("Generated: $path2");

        // 3. Supplier Invoice 1: SGS - £10,000.00 / Multi-Site Supplier Audit & Verification Programme
        $sgsInv1Data = [
            'invoiceNumber' => 'SGS-UK-2026-08194',
            'invoiceDate' => date('d M Y', strtotime('-7 days')),
            'taxDate' => date('d M Y', strtotime('-7 days')),
            'projectRef' => 'SGS-PROJ-TYG-AUD-01',
            'currency' => 'GBP',
            'currencySymbol' => '£',
            'items' => [
                [
                    'name' => 'Multi-Site Supplier Audit & Verification Programme',
                    'desc' => "• Execution of comprehensive on-site technical and quality management system audits (ISO9001 / SMETA / BSCI protocols) across manufacturing facilities.\n• Verification of factory production capacity, machinery calibration, cleanroom certifications, and legal export compliance.\n• Issuance of detailed Non-Conformance Reports (NCR) and verified factory capability scorecards for TakeYourGoods AI supplier database.",
                    'qty' => 1,
                    'price' => 10000.00,
                ],
            ],
            'subtotal' => 10000.00,
            'total' => 10000.00,
        ];

        $pdf3 = Pdf::loadView('pdf.sgs_supplier_invoice', $sgsInv1Data)
            ->setPaper('a4', 'portrait')
            ->setOption(['isRemoteEnabled' => true, 'defaultFont' => 'Helvetica']);
        
        $path3 = $publicDir . '/Supplier_Invoice_SGS_10k_Audit_Verification.pdf';
        $pdf3->save($path3);
        if (File::exists($artifactDir)) {
            File::copy($path3, $artifactDir . '/Supplier_Invoice_SGS_10k_Audit_Verification.pdf');
        }
        $this->info("Generated: $path3");

        // 4. Supplier Invoice 2: SGS - £10,899.00 / Multi-Site Product Inspection & Quality Control Programme
        $sgsInv2Data = [
            'invoiceNumber' => 'SGS-UK-2026-08221',
            'invoiceDate' => date('d M Y', strtotime('-1 days')),
            'taxDate' => date('d M Y', strtotime('-1 days')),
            'projectRef' => 'SGS-PROJ-TYG-QC-02',
            'currency' => 'GBP',
            'currencySymbol' => '£',
            'items' => [
                [
                    'name' => 'Multi-Site Product Inspection & Quality Control Programme',
                    'desc' => "• Pre-Production Inspection (PPI), During Production Inspection (DUPRO), and Final Random Inspection (FRI / PSI) according to ANSI/ASQ Z1.4 sampling standards.\n• Product workmanship, functional defect classification (Critical 0, Major 1.5, Minor 4.0), and barcode/packaging compliance testing.\n• Laboratory material safety screening (RoHS / REACH / CE / UKCA) and Golden Sample clearance certification.",
                    'qty' => 1,
                    'price' => 10899.00,
                ],
            ],
            'subtotal' => 10899.00,
            'total' => 10899.00,
        ];

        $pdf4 = Pdf::loadView('pdf.sgs_supplier_invoice', $sgsInv2Data)
            ->setPaper('a4', 'portrait')
            ->setOption(['isRemoteEnabled' => true, 'defaultFont' => 'Helvetica']);
        
        $path4 = $publicDir . '/Supplier_Invoice_SGS_10899_Inspection_QC.pdf';
        $pdf4->save($path4);
        if (File::exists($artifactDir)) {
            File::copy($path4, $artifactDir . '/Supplier_Invoice_SGS_10899_Inspection_QC.pdf');
        }
        $this->info("Generated: $path4");

        $this->info('All 4 invoices generated successfully!');
        return Command::SUCCESS;
    }
}
