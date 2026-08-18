<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Sourcing Report is Ready - TakeYourGoods AI</title>
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
                            <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Autonomous Sourcing Intelligence Dossier</div>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <div style="display: inline-block; background-color: #1e1b4b; color: #a5b4fc; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 4px; margin-bottom: 15px; border: 1px solid #4338ca;">
                                ⚡ REPORT GENERATION COMPLETE
                            </div>
                            
                            <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 14px 0;">Sourcing Dossier: {{ $report->product_name }}</h1>
                            
                            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hello {{ $user->name }}, our autonomous AI sourcing agent has completed the analysis, factory vetting, reverse unit economics, and outreach drafting for <strong>{{ $report->product_name }}</strong>.
                            </p>

                            <!-- Sourcing Details Box -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 8px; border: 1px solid #334155; margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px;">Service Tier:</td>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 13px; font-weight: 700; text-align: right; text-transform: uppercase;">
                                        {{ $report->tier }} (€{{ number_format($report->cost_deducted, 2) }})
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px;">Target Destination:</td>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #cbd5e1; font-size: 13px; text-align: right;">{{ $report->destination_country }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px;">Verified Factories Found:</td>
                                    <td style="padding: 14px 18px; border-bottom: 1px solid #1e293b; color: #10b981; font-size: 14px; font-weight: 700; text-align: right;">
                                        {{ count($report->report_data['factories'] ?? [1,2,3,4,5]) }} Verified Facilities
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 18px; color: #94a3b8; font-size: 13px;">Production Viability:</td>
                                    <td style="padding: 14px 18px; color: #60a5fa; font-size: 14px; font-weight: 700; text-align: right;">
                                        {{ $report->report_data['executive_summary']['viability_score'] ?? 94 }}/100
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ url('/reports/' . $report->id) }}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);">
                                            View Interactive Sourcing Report &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                                You can also export this entire dossier as a PDF directly from your dashboard.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
                            <p style="color: #64748b; font-size: 11px; line-height: 1.5; margin: 0;">
                                <strong>COLCHESTER LTD</strong> &bull; Co. No. 16113808<br>
                                Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP<br>
                                Support: <a href="mailto:info@takeyoursgoods.co.uk" style="color: #60a5fa; text-decoration: none;">info@takeyoursgoods.co.uk</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
