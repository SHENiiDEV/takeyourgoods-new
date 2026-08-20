<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TakeYourGoods AI</title>
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
            background: linear-gradient(135deg, #1e3a8a, #2563eb);
            padding: 36px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 32px 30px;
        }
        .feature-card {
            background-color: #1f2937;
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 16px;
            margin: 16px 0;
        }
        .feature-title {
            color: #60a5fa;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 4px;
        }
        .feature-desc {
            color: #9ca3af;
            font-size: 12.5px;
            margin: 0;
        }
        .btn-container {
            text-align: center;
            margin: 32px 0 20px;
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
            box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
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
            <h1>TakeYourGoods AI</h1>
            <p style="margin: 6px 0 0; color: #bfdbfe; font-size: 13px; font-weight: 600;">Autonomous B2B Sourcing &amp; Supply Chain Architect</p>
        </div>
        
        <div class="content">
            <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Dear {{ $user->name }}{{ $user->surname ? ' ' . $user->surname : '' }},</h2>
            
            <p style="color: #cbd5e1; font-size: 13.5px;">
                Welcome to <strong>TakeYourGoods AI</strong>. Your corporate sourcing profile is fully active and equipped with real-time neural factory discovery engines.
            </p>

            <div class="feature-card">
                <div class="feature-title">🏭 Direct Tier-1 Factory Audits</div>
                <p class="feature-desc">Access 1,200+ vetted OEM/ODM manufacturing facilities in Shenzhen, Ningbo, and Vietnam with verified production capacities.</p>
            </div>

            <div class="feature-card">
                <div class="feature-title">📊 Reverse Landed Cost &amp; Customs Tariffs</div>
                <p class="feature-desc">Calculate exact sea freight container rates, import duties, and landing margins directly into EU, UK, and US FBA warehouses.</p>
            </div>

            <div class="feature-card">
                <div class="feature-title">💬 1-Click Bilingual RFQ Generation</div>
                <p class="feature-desc">Generate native English/Chinese negotiation scripts and golden sample QC inspection matrices instantly.</p>
            </div>

            <div class="btn-container">
                <a href="{{ url('/reports/create') }}" class="btn">Launch Your First Sourcing Project &rarr;</a>
            </div>

            <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">
                Need assistance? Reply directly to this email or reach out to our trade desk at <a href="mailto:info@takeyourgoods.co.uk" style="color: #60a5fa;">info@takeyourgoods.co.uk</a>.
            </p>
        </div>

        <div class="footer">
            {{ config('services.company.name', 'COLCHESTER LTD') }} &bull; Company No. {{ config('services.company.number', '16113808') }}<br>
            {{ config('services.company.address', 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP') }}<br>
            &copy; {{ date('Y') }} TakeYourGoods AI. All rights reserved.
        </div>
    </div>
</body>
</html>
