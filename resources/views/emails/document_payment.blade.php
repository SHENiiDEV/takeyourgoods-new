<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sourcing Dossier Unlocked &amp; Invoice</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0b0f19;
            color: #f1f5f9;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #111827;
            border: 1px solid #1f2937;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .header {
            background: linear-gradient(135deg, #1e3a8a, #3b82f6);
            padding: 32px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 22px;
            font-weight: 800;
        }
        .content {
            padding: 32px 30px;
        }
        .package-box {
            background-color: #1f2937;
            border: 1px solid #3b82f6;
            border-radius: 16px;
            padding: 20px;
            margin: 20px 0;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 13px;
        }
        .meta-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #1f2937;
        }
        .meta-table td:first-child {
            color: #9ca3af;
        }
        .meta-table td:last-child {
            color: #ffffff;
            font-weight: 600;
            text-align: right;
        }
        .btn-container {
            text-align: center;
            margin: 28px 0 16px;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            color: #ffffff !important;
            font-weight: 700;
            font-size: 14px;
            padding: 14px 32px;
            border-radius: 12px;
            text-decoration: none;
        }
        .pdf-note {
            background-color: #1f2937;
            border-left: 3px solid #60a5fa;
            padding: 12px 16px;
            font-size: 12px;
            color: #cbd5e1;
            border-radius: 0 8px 8px 0;
            margin-top: 20px;
        }
        .footer {
            background-color: #0b0f19;
            padding: 24px 30px;
            text-align: center;
            border-top: 1px solid #1f2937;
            font-size: 11px;
            color: #6b7280;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sourcing Dossier Unlocked</h1>
            <p style="margin: 4px 0 0; color: #dbeafe; font-size: 13px;">Official B2B Tax Invoice &bull; TakeYourGoods AI</p>
        </div>
        
        <div class="content">
            <p style="color: #cbd5e1; font-size: 14px; margin-top: 0;">
                Dear <strong>{{ $user->name }}</strong>,
            </p>
            <p style="color: #9ca3af; font-size: 13px;">
                Your turnkey B2B sourcing dossier has been successfully computed by the autonomous AI engine. Funds have been deducted from your wallet balance.
            </p>

            <div class="package-box">
                <div style="font-size: 11px; text-transform: uppercase; color: #60a5fa; font-weight: 700;">Purchased Dossier Package</div>
                <div style="font-size: 16px; font-weight: 800; color: #ffffff; margin-top: 2px;">{{ $serviceName }}</div>
                @if(!empty($projectName))
                    <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Project: <strong>{{ $projectName }}</strong></div>
                @endif
            </div>

            <table class="meta-table">
                <tr>
                    <td>Deducted Amount:</td>
                    <td style="color: #f87171; font-size: 14px;">-€{{ number_format($amount, 2) }} EUR</td>
                </tr>
                <tr>
                    <td>Invoice Reference:</td>
                    <td style="font-family: monospace; color: #60a5fa;">{{ $invoiceRef }}</td>
                </tr>
                <tr>
                    <td>Remaining Balance:</td>
                    <td style="color: #34d399; font-size: 14px;">€{{ number_format($user->wallet_balance, 2) }} EUR</td>
                </tr>
                <tr>
                    <td>Date &amp; Time:</td>
                    <td>{{ $date->format('d M Y, H:i') }} UTC</td>
                </tr>
            </table>

            <div class="pdf-note">
                📎 <strong>Tax Invoice Included:</strong> The official VAT reverse charge receipt (<code>Invoice_{{ $invoiceRef }}.pdf</code>) is attached to this email.
            </div>

            <div class="btn-container">
                <a href="{{ !empty($projectUrl) ? $projectUrl : url('/dashboard') }}" class="btn">
                    View &amp; Download Full Dossier PDF &rarr;
                </a>
            </div>
        </div>

        <div class="footer">
            {{ config('services.company.name', 'COLCHESTER LTD') }} &bull; Company No. {{ config('services.company.number', '16113808') }}<br>
            {{ config('services.company.address', 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP') }}<br>
            &copy; {{ date('Y') }} TakeYourGoods AI. All rights reserved.
        </div>
    </div>
</body>
</html>
