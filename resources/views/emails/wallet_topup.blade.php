<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet Top-Up Confirmation</title>
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
            background: linear-gradient(135deg, #065f46, #059669);
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
        .amount-box {
            text-align: center;
            background-color: #064e3b;
            border: 1px solid #059669;
            border-radius: 16px;
            padding: 24px;
            margin: 20px 0;
        }
        .amount-val {
            font-size: 36px;
            font-weight: 800;
            color: #34d399;
            font-family: monospace;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
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
            border-left: 3px solid #34d399;
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
            <h1>Payment Confirmed &bull; Funds Credited</h1>
            <p style="margin: 4px 0 0; color: #a7f3d0; font-size: 13px;">Official B2B Tax Receipt Attached</p>
        </div>
        
        <div class="content">
            <p style="color: #cbd5e1; font-size: 14px; margin-top: 0;">
                Dear <strong>{{ $user->name }}</strong>,
            </p>
            <p style="color: #9ca3af; font-size: 13px;">
                Your wallet top-up has been successfully verified. The balance is available immediately for automated supplier dossiers and turnkey sourcing reports.
            </p>

            <div class="amount-box">
                <div style="color: #a7f3d0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Credited Amount</div>
                <div class="amount-val">+€{{ number_format($transaction->amount, 2) }} EUR</div>
            </div>

            <table class="meta-table">
                <tr>
                    <td>Service Item:</td>
                    <td>{{ $transaction->service_name }}</td>
                </tr>
                <tr>
                    <td>Invoice Reference:</td>
                    <td style="font-family: monospace; color: #60a5fa;">{{ $invoiceRef }}</td>
                </tr>
                <tr>
                    <td>Updated Wallet Balance:</td>
                    <td style="color: #34d399; font-size: 15px;">€{{ number_format($user->wallet_balance, 2) }} EUR</td>
                </tr>
                <tr>
                    <td>Date &amp; Time:</td>
                    <td>{{ $transaction->created_at->format('d M Y, H:i') }} UTC</td>
                </tr>
                <tr>
                    <td>Tax / VAT:</td>
                    <td>0% UK B2B Reverse Charge</td>
                </tr>
            </table>

            <div class="pdf-note">
                📎 <strong>Official Invoice Attached:</strong> A formal PDF receipt (<code>Invoice_{{ $invoiceRef }}.pdf</code>) has been attached to this email for your accounting and VAT records.
            </div>

            <div class="btn-container">
                <a href="{{ url('/dashboard') }}" class="btn">Go to Sourcing Dashboard &rarr;</a>
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
