<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TakeYourGoods AI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-bottom: 1px solid #334155;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <div style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                                            TakeYourGoods <span style="background-color: #2563eb; color: #ffffff; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 4px; vertical-align: middle;">AI</span>
                                        </div>
                                        <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Autonomous B2B Sourcing Agent &amp; Supply Chain Intelligence</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 16px 0;">Welcome to Autonomous Sourcing, {{ $user->name }}!</h1>
                            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                                Your corporate account on <strong>TakeYourGoods AI</strong> is now active. You have full access to our autonomous sourcing engine, allowing you to bypass traditional trading middlemen and connect directly with verified tier-1 manufacturers in China and Southeast Asia.
                            </p>

                            <!-- Feature highlights -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #1e293b;">
                                        <div style="font-weight: 700; color: #60a5fa; font-size: 13px;">✓ Verified Factory Direct Network</div>
                                        <div style="color: #94a3b8; font-size: 12px; margin-top: 2px;">Access audited OEM/ODM facilities with real capacity, ISO certs, and true EXW pricing.</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 20px; border-bottom: 1px solid #1e293b;">
                                        <div style="font-weight: 700; color: #60a5fa; font-size: 13px;">✓ Reverse Landed Cost &amp; Tariffs</div>
                                        <div style="color: #94a3b8; font-size: 12px; margin-top: 2px;">Accurate sea/air freight calculations, HS code tariff mapping, and net margin forecasts.</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <div style="font-weight: 700; color: #60a5fa; font-size: 13px;">✓ 1-Click RFQ &amp; Negotiation Engine</div>
                                        <div style="color: #94a3b8; font-size: 12px; margin-top: 2px;">Bilingual outreach scripts in English and Chinese ready for direct factory contact.</div>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ url('/dashboard') }}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);">
                                            Launch Sourcing Dashboard &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin: 0;">
                                If you need assistance with enterprise custom sourcing or bespoke supplier audits, reply directly to this email or contact our London office at <a href="mailto:info@takeyoursgoods.co.uk" style="color: #60a5fa; text-decoration: none;">info@takeyoursgoods.co.uk</a>.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
                            <p style="color: #64748b; font-size: 11px; line-height: 1.5; margin: 0;">
                                <strong>COLCHESTER LTD</strong> &bull; Company No. 16113808<br>
                                Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP<br>
                                &copy; {{ date('Y') }} TakeYourGoods AI. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
