<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') - TakeYourGoods AI</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700,800&display=swap" rel="stylesheet" />
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Figtree', sans-serif;
            background-color: #070b14;
            color: #f8fafc;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow-x: hidden;
        }
        .glow {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 300px;
            background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(79,70,229,0.08) 50%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            filter: blur(60px);
        }
        .card {
            position: relative;
            z-index: 10;
            max-width: 540px;
            width: 100%;
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(51, 65, 85, 0.8);
            border-radius: 24px;
            padding: 40px 32px;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(16px);
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            background: #020617;
            border: 1px solid #1e293b;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            color: #60a5fa;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 6px;
            letter-spacing: -0.02em;
        }
        .subtitle {
            font-size: 12px;
            font-weight: 700;
            color: #60a5fa;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 16px;
        }
        p {
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 28px;
        }
        .btn-group {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
            transition: all 0.2s ease;
        }
        .btn-primary:hover {
            opacity: 0.95;
            transform: translateY(-1px);
        }
        .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 20px;
            background: #1e293b;
            color: #cbd5e1;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 12px;
            border: 1px solid #334155;
            transition: all 0.2s ease;
        }
        .btn-secondary:hover {
            background: #334155;
            color: #ffffff;
        }
        .footer-note {
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #1e293b;
            font-size: 11px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="glow"></div>
    <div class="card">
        <div class="badge">HTTP @yield('code') &bull; @yield('badge')</div>
        <h1>@yield('heading')</h1>
        <div class="subtitle">@yield('subtitle')</div>
        <p>@yield('message')</p>
        <div class="btn-group">
            <a href="/" class="btn-primary">Return to Homepage</a>
            <a href="/dashboard" class="btn-secondary">Sourcing Dashboard</a>
        </div>
        <div class="footer-note">
            COLCHESTER LTD &bull; UK Entity Co. 16113808 &bull; info@takeyourgoods.co.uk
        </div>
    </div>
</body>
</html>
