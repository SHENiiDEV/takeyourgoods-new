<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        @page {
            margin: 30px 40px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1a202c;
            font-size: 13px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 15px;
        }
        .logo-text {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
        }
        .logo-badge {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 4px;
        }
        .company-info {
            font-size: 11px;
            color: #64748b;
            line-height: 1.4;
            text-align: right;
        }
        .invoice-title {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 5px 0;
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
            border-radius: 6px;
            padding: 12px 15px;
            min-height: 100px;
        }
        .meta-box h3 {
            margin: 0 0 8px 0;
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .meta-box p {
            margin: 2px 0;
            font-size: 12px;
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
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 10px 12px;
            text-align: left;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 12px;
            color: #1e293b;
        }
        .items-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .summary-table {
            width: 45%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .summary-table td {
            padding: 6px 12px;
            font-size: 12px;
        }
        .summary-table .total-row {
            border-top: 2px solid #0f172a;
            border-bottom: 2px solid #0f172a;
            font-weight: 800;
            font-size: 14px;
            color: #0f172a;
            background-color: #f1f5f9;
        }
        .paid-stamp {
            display: inline-block;
            border: 3px solid #16a34a;
            color: #16a34a;
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 6px 16px;
            border-radius: 6px;
            margin-top: 10px;
            transform: rotate(-3deg);
        }
        .vat-notice {
            background-color: #f8fafc;
            border-left: 3px solid #2563eb;
            padding: 10px 14px;
            font-size: 11px;
            color: #475569;
            margin-bottom: 25px;
            border-radius: 0 4px 4px 0;
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

    <!-- Header Table -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: middle;">
                <div class="logo-text">
                    TakeYourGoods <span class="logo-badge">AI</span>
                </div>
                <div style="font-size: 11px; color: #64748b; margin-top: 3px;">Autonomous B2B Sourcing Agent & Supply Chain Intelligence</div>
            </td>
            <td class="company-info" style="vertical-align: middle;">
                <strong style="color: #0f172a; font-size: 12px;">{{ $invoice->company_name }}</strong><br>
                Company No. {{ $invoice->company_number }}<br>
                {{ $invoice->company_address }}<br>
                Email: {{ $invoice->company_email }}
            </td>
        </tr>
    </table>

    <!-- Invoice Details & Billing Info -->
    <table class="meta-table">
        <tr>
            <td style="padding-right: 10px;">
                <div class="meta-box">
                    <h3>Billed To (Client)</h3>
                    <p><strong style="font-size: 13px; color: #0f172a;">{{ $invoice->client_name }}</strong></p>
                    @if($invoice->client_company)
                        <p>{{ $invoice->client_company }}</p>
                    @endif
                    <p>Email: {{ $invoice->client_email }}</p>
                    @if($invoice->client_vat)
                        <p>VAT / Tax ID: {{ $invoice->client_vat }}</p>
                    @endif
                    @if($invoice->client_address)
                        <p>{{ $invoice->client_address }}</p>
                    @endif
                </div>
            </td>
            <td style="padding-left: 10px;">
                <div class="meta-box">
                    <div class="invoice-title">INVOICE</div>
                    <p><strong>Invoice Number:</strong> {{ $invoice->invoice_number }}</p>
                    <p><strong>Date of Issue:</strong> {{ $invoice->paid_at ? $invoice->paid_at->format('d M Y, H:i') . ' UTC' : now()->format('d M Y') }}</p>
                    <p><strong>Payment Status:</strong> <span style="color: #16a34a; font-weight: 700;">PAID (Settled in Full)</span></p>
                    <p><strong>Payment Method:</strong> TakeYourGoods Secure Checkout (EUR)</p>
                    <p><strong>Transaction Ref:</strong> {{ $invoice->transaction ? $invoice->transaction->reference_number : 'TYG-TXN-' . $invoice->id }}</p>
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
                <th style="width: 15%; text-align: right;">Unit Price (€)</th>
                <th style="width: 15%; text-align: right;">Total (€)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong style="color: #0f172a;">{{ $invoice->service_name }}</strong><br>
                    <span style="font-size: 11px; color: #64748b;">
                        Digital Autonomous AI Sourcing & Verified Factory Intelligence Infrastructure credits.
                    </span>
                </td>
                <td style="text-align: center;">1</td>
                <td style="text-align: right;">€{{ number_format($invoice->amount, 2) }}</td>
                <td style="text-align: right;"><strong>€{{ number_format($invoice->amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <!-- Summary Table -->
    <table class="summary-table">
        <tr>
            <td style="color: #64748b;">Subtotal (EUR):</td>
            <td style="text-align: right; font-weight: 600;">€{{ number_format($invoice->amount, 2) }}</td>
        </tr>
        <tr>
            <td style="color: #64748b;">VAT (0% Reverse Charge):</td>
            <td style="text-align: right; font-weight: 600;">€0.00</td>
        </tr>
        <tr class="total-row">
            <td>Total Paid:</td>
            <td style="text-align: right;">€{{ number_format($invoice->amount, 2) }} EUR</td>
        </tr>
    </table>

    <div style="clear: both;"></div>

    <!-- Stamp & VAT Reverse Charge Notice -->
    <table style="width: 100%; margin-bottom: 20px;">
        <tr>
            <td style="width: 40%; vertical-align: top;">
                <div class="paid-stamp">
                    ✓ PAID &amp; VERIFIED
                </div>
            </td>
            <td style="width: 60%; vertical-align: top;">
                <div class="vat-notice">
                    <strong>Tax &amp; VAT Declaration:</strong><br>
                    0% VAT Rate applicable. B2B Digital Supply — Subject to Reverse Charge under Article 196 of EU VAT Directive 2006/112/EC and UK Value Added Tax Act 1994 (Schedule 4A / Section 7A).
                </div>
            </td>
        </tr>
    </table>

    <!-- Footer -->
    <div class="footer">
        Thank you for partnering with <strong>TakeYourGoods AI</strong>.<br>
        {{ $invoice->company_name }} &bull; Company Registration No: {{ $invoice->company_number }} &bull; Registered in England &amp; Wales<br>
        {{ $invoice->company_address }} &bull; {{ $invoice->company_email }} &bull; https://takeyourgoods.co.uk
    </div>

</body>
</html>
