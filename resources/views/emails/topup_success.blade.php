<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet Top-Up Confirmed - Invoice Attached</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-bottom: 1px solid #334155;">
                            <div style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                                TakeYourGoods <span style="background-color: #2563eb; color: #ffffff; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 4px; vertical-align: middle;">AI</span>
                            </div>
                            <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Payment Confirmation &amp; B2B VAT Invoice</div>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <div style="display: inline-block; background-color: #064e3b; color: #34d399; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 4px; margin-bottom: 15px; border: 1px solid #059669;">
                                ✓ PAYMENT SUCCESSFUL &bull; FUNDS AVAILABLE
                            </div>
                            
                            <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 14px 0;">€{{ number_format($transaction->amount, 2) }} Credited to Wallet</h1>
                            
                            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hello {{ $user->name }}, your wallet top-up has been processed successfully. Your account is immediately ready to generate new Sourcing Reports.
                            </p>

                            <!-- Transaction Details Box -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px;">Service / Item:</td>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 13px; font-weight: 600; text-align: right;">{{ $transaction->service_name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px;">Transaction Amount:</td>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #10b981; font-size: 14px; font-weight: 700; text-align: right;">€{{ number_format($transaction->amount, 2) }} EUR</td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px;">Current Wallet Balance:</td>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #60a5fa; font-size: 14px; font-weight: 700; text-align: right;">€{{ number_format($user->wallet_balance, 2) }} EUR</td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px;">Transaction Reference:</td>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #cbd5e1; font-size: 12px; font-family: monospace; text-align: right;">{{ $transaction->reference_number }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 18px; color: #94a3b8; font-size: 13px;">Invoice Attached:</td>
                                    <td style="padding: 14px 18px; color: #f8fafc; font-size: 13px; font-weight: 600; text-align: right;">
                                        @if($invoice)
                                            {{ $invoice->invoice_number }} (PDF)
                                        @else
                                            Official Invoice (Attached)
                                        @endif
                                    </td>
                                </tr>
                            </table>

                            <div style="background-color: #1e293b; border-left: 4px solid #3b82f6; padding: 12px 16px; margin-bottom: 25px; border-radius: 0 6px 6px 0;">
                                <p style="margin: 0; font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                                    📎 <strong>B2B Tax Invoice Attached:</strong> An official PDF receipt and VAT reverse charge invoice issued by <strong>COLCHESTER LTD</strong> has been attached to this email for your corporate accounting.
                                </p>
                            </div>

                            <!-- CTA Button -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ url('/reports/create') }}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 13px 28px; border-radius: 8px;">
                                            Create New Sourcing Report &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
                            <p style="color: #64748b; font-size: 11px; line-height: 1.5; margin: 0;">
                                <strong>COLCHESTER LTD</strong> &bull; Co. No. 16113808<br>
                                Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP<br>
                                Need billing support? Contact <a href="mailto:info@takeyoursgoods.co.uk" style="color: #60a5fa; text-decoration: none;">info@takeyoursgoods.co.uk</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
