<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Invoice {{ $invoiceNumber }} - COLCHESTER LTD</title>
    <style>
        @page {
            margin: 35px 40px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            font-size: 11.5px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 22px;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 15px;
        }
        .company-info {
            font-size: 10.5px;
            color: #475569;
            line-height: 1.45;
            text-align: right;
        }
        .company-title {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
        }
        .doc-title-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .doc-title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 22px;
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
            min-height: 105px;
        }
        .meta-box h3 {
            margin: 0 0 6px 0;
            font-size: 9.5px;
            font-weight: 800;
            color: #2563eb;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }
        .meta-box p {
            margin: 2.5px 0;
            font-size: 11px;
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
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            padding: 9px 12px;
            text-align: left;
        }
        .items-table td {
            padding: 11px 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
            color: #1e293b;
        }
        .items-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .summary-table {
            width: 50%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .summary-table td {
            padding: 6px 12px;
            font-size: 11px;
        }
        .summary-table .total-row {
            border-top: 2px solid #0f172a;
            border-bottom: 2px solid #0f172a;
            font-weight: 800;
            font-size: 13px;
            color: #0f172a;
            background-color: #f1f5f9;
        }
        .paid-stamp {
            display: inline-block;
            border: 2px solid #16a34a;
            color: #16a34a;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            padding: 5px 12px;
            border-radius: 4px;
            background-color: #f0fdf4;
        }
        .vat-notice {
            background-color: #eff6ff;
            border-left: 3px solid #2563eb;
            padding: 9px 12px;
            font-size: 10px;
            color: #1e40af;
            line-height: 1.45;
            border-radius: 0 4px 4px 0;
            margin-bottom: 15px;
        }
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            font-size: 9.5px;
            color: #64748b;
            text-align: center;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    <!-- Header Table -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: middle; width: 55%;">
                <div style="font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                    TakeYourGoods <span style="background-color: #2563eb; color: #ffffff; font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: 800;">AI</span>
                </div>
                <div style="font-size: 9.5px; color: #64748b; margin-top: 2px; font-weight: 600;">
                    Autonomous Global Sourcing &amp; Supply Chain Infrastructure
                </div>
                <div style="font-size: 9.5px; color: #2563eb; font-weight: 600;">
                    https://takeyourgoods.co.uk
                </div>
            </td>
            <td class="company-info" style="vertical-align: middle; width: 45%;">
                <div class="company-title">COLCHESTER LTD</div>
                Company Registration No: <strong>16113808</strong><br>
                Dept 6898 126 East Ferry Road, Canary Wharf<br>
                London, England, E14 9FP, United Kingdom<br>
                Email: info@takeyourgoods.co.uk
            </td>
        </tr>
    </table>

    <!-- Document Title & Status -->
    <table class="doc-title-table">
        <tr>
            <td>
                <div class="doc-title">B2B TAX INVOICE</div>
                <div style="font-size: 10.5px; color: #64748b;">Invoice Reference: <strong style="color: #0f172a;">{{ $invoiceNumber }}</strong></div>
            </td>
            <td style="text-align: right; vertical-align: middle;">
                <div class="paid-stamp">PAID &amp; VERIFIED</div>
            </td>
        </tr>
    </table>

    <!-- Billing Info & Meta -->
    <table class="meta-table">
        <tr>
            <td style="padding-right: 8px;">
                <div class="meta-box">
                    <h3>Billed To (Client / Customer)</h3>
                    <p><strong style="font-size: 12px; color: #0f172a;">{{ $clientName }}</strong></p>
                    @if(!empty($clientCompany))
                        <p><strong>{{ $clientCompany }}</strong></p>
                    @endif
                    <p>{{ $clientAddress }}</p>
                    <p>Email: {{ $clientEmail }}</p>
                    @if(!empty($clientVat))
                        <p>VAT ID: {{ $clientVat }}</p>
                    @endif
                </div>
            </td>
            <td style="padding-left: 8px;">
                <div class="meta-box">
                    <h3>Invoice &amp; Transaction Details</h3>
                    <p>Invoice Date: <strong>{{ $invoiceDate }}</strong></p>
                    <p>Payment Date: <strong>{{ $paidDate }}</strong></p>
                    <p>Payment Method: <strong>{{ $paymentMethod ?? 'B2B Corporate Wire / Card Checkout' }}</strong></p>
                    <p>Settlement Currency: <strong>{{ $currency }} (€)</strong></p>
                    <p>Order Reference: <strong>{{ $orderRef }}</strong></p>
                </div>
            </td>
        </tr>
    </table>

    <!-- Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 55%;">Service Description &amp; Scope</th>
                <th style="width: 12%; text-align: center;">Qty</th>
                <th style="width: 14%; text-align: right;">Unit Price</th>
                <th style="width: 14%; text-align: right;">Amount ({{ $currency }})</th>
            </tr>
        </thead>
        <tbody>
            @foreach($items as $idx => $item)
                <tr>
                    <td style="text-align: center; color: #64748b;">{{ $idx + 1 }}</td>
                    <td>
                        <strong style="color: #0f172a; font-size: 11.5px;">{{ $item['name'] }}</strong>
                        @if(!empty($item['desc']))
                            <div style="font-size: 9.5px; color: #64748b; margin-top: 3px; line-height: 1.4;">
                                {!! nl2br(e($item['desc'])) !!}
                            </div>
                        @endif
                    </td>
                    <td style="text-align: center; font-weight: 600;">{{ $item['qty'] ?? 1 }}</td>
                    <td style="text-align: right; font-family: monospace;">{{ number_format($item['price'], 2) }}</td>
                    <td style="text-align: right; font-family: monospace; font-weight: 700;">{{ number_format($item['price'] * ($item['qty'] ?? 1), 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Summary Table -->
    <table class="summary-table">
        <tr>
            <td style="color: #64748b;">Subtotal:</td>
            <td style="text-align: right; font-family: monospace; font-weight: 600;">€{{ number_format($subtotal, 2) }}</td>
        </tr>
        <tr>
            <td style="color: #64748b;">VAT Rate (0% B2B Cross-Border Reverse Charge):</td>
            <td style="text-align: right; font-family: monospace; font-weight: 600;">€0.00</td>
        </tr>
        <tr class="total-row">
            <td>Total Paid:</td>
            <td style="text-align: right; font-family: monospace;">€{{ number_format($total, 2) }} {{ $currency }}</td>
        </tr>
    </table>

    <!-- VAT Reverse Charge Notice -->
    <div class="vat-notice">
        <strong>VAT Notice / Cross-Border B2B Supply:</strong> Supply of automated digital intelligence and global sourcing services. VAT accounted for under Reverse Charge mechanism pursuant to UK Value Added Tax Act 1994 / EU VAT Directive Article 196 where applicable. Zero-rated VAT (0%).
    </div>

    <!-- Footer -->
    <div class="footer">
        <strong>COLCHESTER LTD</strong> &bull; Registered in England and Wales &bull; Company No: 16113808<br>
        Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP &bull; https://takeyourgoods.co.uk<br>
        Thank you for partnering with TakeYourGoods AI. All supplier telemetry, BOM analysis, and dossiers are proprietary to the client.
    </div>

</body>
</html>
