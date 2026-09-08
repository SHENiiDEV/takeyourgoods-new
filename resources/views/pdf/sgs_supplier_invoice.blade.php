<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>SGS Tax Invoice {{ $invoiceNumber }}</title>
    <style>
        @page {
            margin: 35px 40px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #27272a;
            font-size: 11.5px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border-bottom: 3px solid #ea580c; /* SGS Orange */
            padding-bottom: 15px;
        }
        .sgs-logo-box {
            font-size: 32px;
            font-weight: 900;
            color: #ea580c;
            letter-spacing: -1px;
            line-height: 1;
        }
        .sgs-sub {
            font-size: 9px;
            font-weight: 700;
            color: #4b5563;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-top: 4px;
        }
        .supplier-info {
            font-size: 10px;
            color: #4b5563;
            line-height: 1.45;
            text-align: right;
        }
        .supplier-name {
            font-size: 12.5px;
            font-weight: 800;
            color: #111827;
        }
        .doc-title-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .doc-title {
            font-size: 20px;
            font-weight: 800;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.5px;
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
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            padding: 12px 14px;
            min-height: 110px;
        }
        .meta-box h3 {
            margin: 0 0 6px 0;
            font-size: 9.5px;
            font-weight: 800;
            color: #ea580c;
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }
        .meta-box p {
            margin: 2px 0;
            font-size: 11px;
            color: #374151;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table th {
            background-color: #1f2937;
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 9px 12px;
            text-align: left;
        }
        .items-table td {
            padding: 11px 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 11px;
            color: #1f2937;
        }
        .items-table tr:nth-child(even) {
            background-color: #f9fafb;
        }
        .summary-table {
            width: 48%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .summary-table td {
            padding: 6px 12px;
            font-size: 11px;
        }
        .summary-table .total-row {
            border-top: 2px solid #1f2937;
            border-bottom: 2px solid #1f2937;
            font-weight: 800;
            font-size: 13px;
            color: #111827;
            background-color: #f3f4f6;
        }
        .bank-details {
            background-color: #fffaf5;
            border: 1px solid #fed7aa;
            border-left: 4px solid #ea580c;
            border-radius: 4px;
            padding: 12px 14px;
            font-size: 10.5px;
            color: #431407;
            line-height: 1.5;
            margin-bottom: 18px;
        }
        .bank-details h4 {
            margin: 0 0 4px 0;
            font-size: 10px;
            font-weight: 800;
            color: #c2410c;
            text-transform: uppercase;
            letter-spacing: 0.6px;
        }
        .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 12px;
            font-size: 9px;
            color: #6b7280;
            text-align: center;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    <!-- Header Table -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: middle; width: 45%;">
                <div class="sgs-logo-box">SGS</div>
                <div class="sgs-sub">WHEN YOU NEED TO BE SURE</div>
                <div style="font-size: 9.5px; color: #ea580c; font-weight: 700; margin-top: 3px;">
                    https://www.sgs.com/en-gb
                </div>
            </td>
            <td class="supplier-info" style="vertical-align: middle; width: 55%;">
                <div class="supplier-name">SGS UNITED KINGDOM LIMITED</div>
                Rossmore Business Park, Ellesmere Port<br>
                Cheshire, CH65 3EN, United Kingdom<br>
                Company Registration No: <strong>01193985</strong><br>
                VAT Registration No: <strong>GB 645 3349 97</strong><br>
                Email: ukinvoicing@sgs.com &bull; Tel: +44 (0)151 350 6666
            </td>
        </tr>
    </table>

    <!-- Document Title & Header Meta -->
    <table class="doc-title-table">
        <tr>
            <td>
                <div class="doc-title">COMMERCIAL TAX INVOICE</div>
                <div style="font-size: 10.5px; color: #6b7280;">Invoice No: <strong style="color: #111827;">{{ $invoiceNumber }}</strong></div>
            </td>
            <td style="text-align: right; vertical-align: middle;">
                <div style="display: inline-block; border: 2px solid #059669; color: #059669; font-size: 11.5px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; background-color: #ecfdf5;">
                    CONFIRMED &amp; ISSUED
                </div>
            </td>
        </tr>
    </table>

    <!-- Billing Info -->
    <table class="meta-table">
        <tr>
            <td style="padding-right: 8px;">
                <div class="meta-box">
                    <h3>Customer (Bill To)</h3>
                    <p><strong style="font-size: 12px; color: #111827;">COLCHESTER LTD</strong></p>
                    <p>Trading as TakeYourGoods AI</p>
                    <p>Dept 6898 126 East Ferry Road, Canary Wharf</p>
                    <p>London, England, E14 9FP, United Kingdom</p>
                    <p>Company No: 16113808</p>
                    <p>Email: info@takeyourgoods.co.uk</p>
                </div>
            </td>
            <td style="padding-left: 8px;">
                <div class="meta-box">
                    <h3>Commercial References</h3>
                    <p>Invoice Date: <strong>{{ $invoiceDate }}</strong></p>
                    <p>Tax Point / Execution Date: <strong>{{ $taxDate }}</strong></p>
                    <p>Payment Terms: <strong>Net 30 Days (Direct Corporate Settlement)</strong></p>
                    <p>SGS Project Ref: <strong>{{ $projectRef }}</strong></p>
                    <p>Currency: <strong>{{ $currency }}</strong></p>
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 55%;">Service Item &amp; Technical Scope</th>
                <th style="width: 12%; text-align: center;">Units / Sites</th>
                <th style="width: 14%; text-align: right;">Rate ({{ $currency }})</th>
                <th style="width: 14%; text-align: right;">Total ({{ $currency }})</th>
            </tr>
        </thead>
        <tbody>
            @foreach($items as $idx => $item)
                <tr>
                    <td style="text-align: center; color: #6b7280;">{{ $idx + 1 }}</td>
                    <td>
                        <strong style="color: #111827; font-size: 11.5px;">{{ $item['name'] }}</strong>
                        @if(!empty($item['desc']))
                            <div style="font-size: 9.5px; color: #4b5563; margin-top: 3px; line-height: 1.4;">
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
            <td style="color: #6b7280;">Net Subtotal:</td>
            <td style="text-align: right; font-family: monospace; font-weight: 600;">{{ $currencySymbol }}{{ number_format($subtotal, 2) }}</td>
        </tr>
        <tr>
            <td style="color: #6b7280;">VAT (0% UK B2B Sourcing / Zero-Rated Cross-Border):</td>
            <td style="text-align: right; font-family: monospace; font-weight: 600;">{{ $currencySymbol }}0.00</td>
        </tr>
        <tr class="total-row">
            <td>Total Invoice Amount:</td>
            <td style="text-align: right; font-family: monospace;">{{ $currencySymbol }}{{ number_format($total, 2) }} {{ $currency }}</td>
        </tr>
    </table>

    <!-- Bank Details -->
    <div class="bank-details">
        <h4>Remittance &amp; Bank Settlement Details</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 10.5px;">
            <tr>
                <td style="width: 50%;">
                    Bank: <strong>Barclays Bank UK PLC</strong><br>
                    Account Name: <strong>SGS UNITED KINGDOM LIMITED</strong><br>
                    Account No: <strong>40891276</strong> &bull; Sort Code: <strong>20-00-00</strong>
                </td>
                <td style="width: 50%;">
                    IBAN: <strong>GB44 BARC 2000 0040 8912 76</strong><br>
                    SWIFT / BIC: <strong>BARCGB22</strong><br>
                    Payment Reference: <strong>{{ $invoiceNumber }}</strong>
                </td>
            </tr>
        </table>
    </div>

    <!-- Footer -->
    <div class="footer">
        <strong>SGS UNITED KINGDOM LIMITED</strong> &bull; Rossmore Business Park, Ellesmere Port, Cheshire, CH65 3EN, United Kingdom<br>
        Registered in England and Wales No. 01193985 &bull; VAT Reg No: GB 645 3349 97 &bull; https://www.sgs.com/en-gb<br>
        Services are rendered subject to SGS General Conditions of Service available at www.sgs.com/terms_and_conditions.
    </div>

</body>
</html>
