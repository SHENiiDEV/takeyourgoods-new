<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Support Ticket</title>
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
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 20px;
            font-weight: 800;
        }
        .content {
            padding: 30px;
        }
        .meta-box {
            background-color: #1f2937;
            border: 1px solid #374151;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 20px;
            font-size: 13px;
        }
        .message-box {
            background-color: #0f172a;
            border: 1px solid #2563eb;
            border-radius: 12px;
            padding: 18px;
            color: #e2e8f0;
            font-size: 13.5px;
            white-space: pre-wrap;
            margin: 16px 0;
        }
        .footer {
            background-color: #0b0f19;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #1f2937;
            font-size: 11px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Client Support Ticket</h1>
            <p style="margin: 4px 0 0; color: #bfdbfe; font-size: 12px;">TakeYourGoods AI Support Desk</p>
        </div>
        
        <div class="content">
            <div class="meta-box">
                <p style="margin: 0 0 6px;"><strong>From:</strong> {{ $name }} &lt;{{ $email }}&gt;</p>
                <p style="margin: 0 0 6px;"><strong>Subject:</strong> {{ $contactSubject }}</p>
                @if($ip)
                    <p style="margin: 0; color: #9ca3af; font-size: 11px;"><strong>Client IP:</strong> {{ $ip }} &bull; <strong>Time:</strong> {{ now()->format('d M Y, H:i') }} UTC</p>
                @endif
            </div>

            <div style="font-size: 12px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</div>
            <div class="message-box">{{ $contactMessage }}</div>

            <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
                You can reply directly to this email to respond to <strong>{{ $name }}</strong>.
            </p>
        </div>

        <div class="footer">
            {{ config('services.company.name', 'COLCHESTER LTD') }} Support Desk<br>
            {{ config('services.company.address', 'Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP') }}
        </div>
    </div>
</body>
</html>
