<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Invoice {{ $invoiceNumber ?? ($transaction->reference_number ?? 'INV-'.$transaction->id) }}</title>
    <style>
        @page {
            margin: 40px 45px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            font-size: 12px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 18px;
        }
        .logo-text {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
        }
        .logo-badge {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            padding: 3px 7px;
            border-radius: 4px;
            margin-left: 4px;
            vertical-align: middle;
        }
        .company-info {
            font-size: 11px;
            color: #64748b;
            line-height: 1.45;
            text-align: right;
        }
        .invoice-badge-title {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 6px 0;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .meta-table td {
            vertical-align: top;
            width: 50%;
        }
        .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 16px;
            min-height: 110px;
        }
        .meta-box h3 {
            margin: 0 0 8px 0;
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }
        .meta-box p {
            margin: 3px 0;
            font-size: 11.5px;
            color: #334155;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            padding: 10px 12px;
            text-align: left;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11.5px;
            color: #1e293b;
        }
        .items-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .summary-table {
            width: 48%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .summary-table td {
            padding: 7px 12px;
            font-size: 11.5px;
        }
        .summary-table .total-row {
            border-top: 2px solid #0f172a;
            border-bottom: 2px solid #0f172a;
            font-weight: 800;
            font-size: 13.5px;
            color: #0f172a;
            background-color: #f1f5f9;
        }
        .paid-stamp {
            display: inline-block;
            border: 2.5px solid #16a34a;
            color: #16a34a;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            padding: 6px 14px;
            border-radius: 6px;
            transform: rotate(-3deg);
            background-color: rgba(22, 163, 74, 0.05);
        }
        .vat-notice {
            background-color: #f8fafc;
            border-left: 3px solid #2563eb;
            padding: 10px 14px;
            font-size: 10.5px;
            color: #475569;
            line-height: 1.45;
            border-radius: 0 4px 4px 0;
        }
        .legal-notice {
            background-color: #fafafa;
            border: 1px dashed #cbd5e1;
            padding: 10px 14px;
            font-size: 10px;
            color: #64748b;
            line-height: 1.4;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    @php
        $companyName = config('services.company.name', 'INCHWARD LIMITED');
        $companyNumber = config('services.company.number', '16021412');
        $companyAddress = config('services.company.address', 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom');
        $companyEmail = config('services.company.email', 'info@voltoria.co.uk');
        $invoiceRef = $invoiceNumber ?? ($transaction->reference_number ?? 'INV-' . $transaction->id);
        $amount = $transaction->amount ?? ($invoice->amount ?? 0);
        $currency = $transaction->currency ?? 'EUR';
        $serviceName = $transaction->service_name ?? ($invoice->service_name ?? 'B2B Digital Platform Sourcing Services');
        $paidDate = $transaction->created_at ?? now();
        $clientName = $user->name . ($user->surname ? ' ' . $user->surname : '');
        $clientEmail = $user->email;
        $clientAddress = $user->billing_address ?? ($user->street_address ? $user->street_address . ', ' . $user->city . ', ' . $user->postcode . ', ' . $user->country : null);
        $clientCompany = $user->company_name ?? null;
        $clientVat = $user->vat_number ?? null;
    @endphp

    <!-- Header Table -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: middle;">
                <div class="logo-text">
                    TakeYourGoods <span class="logo-badge">AI</span>
                </div>
                <div style="font-size: 10.5px; color: #64748b; margin-top: 3px; font-weight: 600;">
                    Autonomous B2B Sourcing Agent &amp; Global Supply Chain Infrastructure
                </div>
            </td>
            <td class="company-info" style="vertical-align: middle;">
                <strong style="color: #0f172a; font-size: 12px;">{{ $companyName }}</strong><br>
                Company Registration No: {{ $companyNumber }}<br>
                {{ $companyAddress }}<br>
                Email: {{ $companyEmail }}
            </td>
        </tr>
    </table>

    <!-- Invoice Details & Billing Info -->
    <table class="meta-table">
        <tr>
            <td style="padding-right: 10px;">
                <div class="meta-box">
                    <h3>Billed To (Client / Organization)</h3>
                    <p><strong style="font-size: 12.5px; color: #0f172a;">{{ $clientName }}</strong></p>
                    @if($clientCompany)
                        <p style="font-weight: 600;">{{ $clientCompany }}</p>
                    @endif
                    <p>Email: {{ $clientEmail }}</p>
                    @if($clientVat)
                        <p>VAT / Tax ID: {{ $clientVat }}</p>
                    @endif
                    @if($clientAddress)
                        <p>{{ $clientAddress }}</p>
                    @endif
                </div>
            </td>
            <td style="padding-left: 10px;">
                <div class="meta-box">
                    <div class="invoice-badge-title">OFFICIAL RECEIPT / INVOICE</div>
                    <p><strong>Invoice Reference:</strong> {{ $invoiceRef }}</p>
                    <p><strong>Date of Issue:</strong> {{ $paidDate->format('d M Y, H:i') }} UTC</p>
                    <p><strong>Payment Status:</strong> <span style="color: #16a34a; font-weight: 700;">PAID &amp; SETTLED IN FULL</span></p>
                    <p><strong>Payment Method:</strong> B2B Instant Gateway ({{ $currency }})</p>
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 55%;">Description of Digital B2B Services</th>
                <th style="width: 15%; text-align: center;">Qty</th>
                <th style="width: 15%; text-align: right;">Unit Price ({{ $currency }})</th>
                <th style="width: 15%; text-align: right;">Total ({{ $currency }})</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong style="color: #0f172a;">{{ $serviceName }}</strong><br>
                    <span style="font-size: 10.5px; color: #64748b;">
                        Turnkey B2B Digital Sourcing Dossier, Audited Factory Intelligence &amp; Landed Tariff Computation.
                    </span>
                </td>
                <td style="text-align: center;">1</td>
                <td style="text-align: right;">€{{ number_format($amount, 2) }}</td>
                <td style="text-align: right;"><strong>€{{ number_format($amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <!-- Summary Table -->
    <table class="summary-table">
        <tr>
            <td style="color: #64748b;">Subtotal ({{ $currency }}):</td>
            <td style="text-align: right; font-weight: 600;">€{{ number_format($amount, 2) }}</td>
        </tr>
        <tr>
            <td style="color: #64748b;">VAT / Tax (0% UK B2B / Reverse Charge):</td>
            <td style="text-align: right; font-weight: 600;">€0.00</td>
        </tr>
        <tr class="total-row">
            <td>Total Paid:</td>
            <td style="text-align: right;">€{{ number_format($amount, 2) }} {{ $currency }}</td>
        </tr>
    </table>

    <div style="clear: both;"></div>

    <!-- Stamp & Tax Notice -->
    <table style="width: 100%; margin-bottom: 18px;">
        <tr>
            <td style="width: 38%; vertical-align: top;">
                <div class="paid-stamp">
                    ✓ PAID &amp; VERIFIED
                </div>
            </td>
            <td style="width: 62%; vertical-align: top;">
                <div class="vat-notice">
                    <strong>Tax &amp; VAT Declaration:</strong><br>
                    0% VAT Rate applicable. B2B Digital Supply — Subject to Reverse Charge under Article 196 of EU VAT Directive 2006/112/EC and UK Value Added Tax Act 1994 (Schedule 4A / Section 7A).
                </div>
            </td>
        </tr>
    </table>

    <!-- Legal Notice (Refunds & Jurisdiction) -->
    <div class="legal-notice">
        <strong>Legal &amp; Consumer Protection Notice:</strong> In accordance with UK Distance Selling regulations and B2B SaaS terms, clients retain a 14-day refund right on any unspent digital wallet balance. This invoice is issued under the laws and jurisdiction of England &amp; Wales.
    </div>

    <!-- Footer -->
    <div class="footer">
        Thank you for partnering with <strong>TakeYourGoods AI</strong>.<br>
        {{ $companyName }} &bull; Company Registration No: {{ $companyNumber }} &bull; Registered in England &amp; Wales<br>
        {{ $companyAddress }} &bull; {{ $companyEmail }} &bull; https://takeyourgoods.co.uk
    </div>

</body>
</html>
