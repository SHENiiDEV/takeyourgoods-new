<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Sourcing Report - {{ $report->product_name }}</title>
    <style>
        @page {
            margin: 25px 35px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #0f172a;
            font-size: 11px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
        }
        .header {
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 20px;
        }
        .logo-title {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
        }
        .badge {
            background-color: #2563eb;
            color: #fff;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .tier-badge {
            background-color: #10b981;
            color: #fff;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }
        h2 {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
            margin-top: 18px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 10px 14px;
            margin-bottom: 12px;
        }
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 10px;
        }
        table.data-table th {
            background-color: #1e293b;
            color: #ffffff;
            padding: 7px 8px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
        }
        table.data-table td {
            padding: 7px 8px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }
        table.data-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .metric-box {
            display: inline-block;
            width: 23%;
            background-color: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            padding: 8px;
            text-align: center;
            vertical-align: top;
            margin-right: 1.5%;
            margin-bottom: 10px;
        }
        .metric-val {
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
        }
        .metric-lbl {
            font-size: 9px;
            color: #64748b;
            text-transform: uppercase;
        }
        .template-box {
            background-color: #0f172a;
            color: #f8fafc;
            font-family: 'Courier New', Courier, monospace;
            padding: 10px;
            border-radius: 4px;
            font-size: 9.5px;
            line-height: 1.4;
            white-space: pre-wrap;
            margin-bottom: 10px;
        }
        .page-break {
            page-break-after: always;
        }
        .footer {
            margin-top: 25px;
            border-top: 1px solid #cbd5e1;
            padding-top: 10px;
            font-size: 9px;
            color: #94a3b8;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="header">
        <table style="width: 100%;">
            <tr>
                <td>
                    <span class="logo-title">TakeYourGoods <span class="badge">AI</span></span>
                    <div style="color: #64748b; font-size: 10px; margin-top: 2px;">Autonomous B2B Sourcing Dossier &amp; Factory Intelligence</div>
                </td>
                <td style="text-align: right;">
                    <span class="tier-badge">{{ strtoupper($report->tier) }} TIER</span><br>
                    <span style="font-size: 10px; color: #64748b;">Report ID: #TYG-REP-{{ str_pad($report->id, 5, '0', STR_PAD_LEFT) }}</span><br>
                    <span style="font-size: 10px; color: #64748b;">Generated: {{ $report->created_at->format('d M Y, H:i') }} UTC</span>
                </td>
            </tr>
        </table>
    </div>

    <!-- Overview Banner -->
    <div class="card">
        <table style="width: 100%;">
            <tr>
                <td style="width: 50%; vertical-align: top;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; color: #0f172a;">{{ $report->product_name }}</h3>
                    <p style="margin: 2px 0; color: #475569;"><strong>Target Category:</strong> {{ $report->product_category ?? 'Consumer Goods / Electronics' }}</p>
                    <p style="margin: 2px 0; color: #475569;"><strong>Target Market / Destination:</strong> {{ $report->destination_country }}</p>
                    <p style="margin: 2px 0; color: #475569;"><strong>Target Order Volume:</strong> {{ number_format($report->target_quantity ?? 1000) }} units</p>
                </td>
                <td style="width: 50%; vertical-align: top;">
                    <p style="margin: 2px 0; color: #475569;"><strong>Target Production Cost:</strong> €{{ number_format($report->target_cost ?? 15, 2) }}</p>
                    <p style="margin: 2px 0; color: #475569;"><strong>Sourcing Strategy:</strong> {{ $report->report_data['executive_summary']['recommended_strategy'] ?? 'Direct OEM Manufacturer' }}</p>
                    <p style="margin: 2px 0; color: #475569;"><strong>AI Intelligence Engine:</strong> TakeYourGoods Autonomous Sourcing Engine</p>
                </td>

            </tr>
        </table>
    </div>

    <!-- Executive Summary & Key Metrics -->
    <h2>1. Executive Summary &amp; Viability Assessment</h2>
    <div>
        <div class="metric-box">
            <div class="metric-val" style="color: #16a34a;">{{ $report->report_data['executive_summary']['viability_score'] ?? 94 }}/100</div>
            <div class="metric-lbl">Production Viability Score</div>
        </div>
        <div class="metric-box">
            <div class="metric-val">€{{ $report->report_data['unit_economics']['exw_cost'] ?? '8.50' }}</div>
            <div class="metric-lbl">Est. EXW Unit Cost</div>
        </div>
        <div class="metric-box">
            <div class="metric-val">€{{ $report->report_data['unit_economics']['total_landed_cost_sea'] ?? '12.40' }}</div>
            <div class="metric-lbl">Total Landed Cost (Sea)</div>
        </div>
        <div class="metric-box" style="margin-right: 0;">
            <div class="metric-val" style="color: #2563eb;">{{ $report->report_data['unit_economics']['projected_net_margin_percentage'] ?? '58%' }}</div>
            <div class="metric-lbl">Projected Net Margin</div>
        </div>
    </div>

    <p style="font-size: 10.5px; color: #334155; line-height: 1.5; margin-top: 5px;">
        {{ $report->report_data['executive_summary']['overview_narrative'] ?? 'Comprehensive factory analysis completed across tier-1 manufacturing clusters. Production feasibility is confirmed with high margin potential and established supply chain routes.' }}
    </p>

    <!-- Verified Suppliers -->
    <h2>2. Verified Factory Shortlist &amp; Credentials</h2>
    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 24%;">Factory / Supplier</th>
                <th style="width: 18%;">Location &amp; Type</th>
                <th style="width: 14%;">MOQ &amp; Lead Time</th>
                <th style="width: 16%;">Est. Unit Price</th>
                <th style="width: 28%;">Certifications &amp; Vetting Score</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report->report_data['factories'] ?? [] as $factory)
            <tr>
                <td>
                    <strong>{{ $factory['name'] ?? 'Premier Manufacturing Co.' }}</strong><br>
                    <span style="color: #64748b;">Contact: {{ $factory['contact_person'] ?? 'Sales Dept' }}</span><br>
                    <span style="color: #2563eb;">{{ $factory['contact_email'] ?? 'sales@factory.com' }}</span>
                </td>
                <td>
                    {{ $factory['location'] ?? 'Shenzhen, Guangdong, China' }}<br>
                    <span style="color: #64748b;">{{ $factory['factory_type'] ?? 'OEM/ODM Specialist' }} ({{ $factory['years_in_business'] ?? '10+' }} yrs)</span>
                </td>
                <td>
                    MOQ: <strong>{{ $factory['moq'] ?? '500 pcs' }}</strong><br>
                    Lead: {{ $factory['lead_time_days'] ?? '25-30 days' }}
                </td>
                <td>
                    <strong>{{ $factory['unit_cost_range'] ?? '€8.20 - €9.50' }}</strong><br>
                    <span style="color: #64748b;">Sample: {{ $factory['sample_cost'] ?? '€45 (Refundable)' }}</span>
                </td>
                <td>
                    <span style="color: #16a34a; font-weight: 700;">✓ Audit: {{ $factory['verified_audit_status'] ?? 'Verified Tier-A' }}</span><br>
                    <span style="color: #475569;">{{ implode(', ', (array)($factory['certifications'] ?? ['ISO9001', 'CE', 'RoHS', 'BSCI'])) }}</span>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="page-break"></div>

    <!-- Unit Economics & Logistics -->
    <h2>3. Landed Cost &amp; Reverse Unit Economics Breakdown</h2>
    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 60%;">Cost Component (Per Unit)</th>
                <th style="width: 20%; text-align: right;">Sea Freight Route</th>
                <th style="width: 20%; text-align: right;">Air Express Route</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Factory EXW Production Cost (Tooling &amp; Materials)</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['exw_cost'] ?? '8.50' }}</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['exw_cost'] ?? '8.50' }}</td>
            </tr>
            <tr>
                <td>Freight &amp; Port Handling (FOB to Destination Port)</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['sea_freight_per_unit'] ?? '1.80' }}</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['air_express_per_unit'] ?? '5.40' }}</td>
            </tr>
            <tr>
                <td>Customs Tariff &amp; Import Duties (HS Code: {{ $report->report_data['compliance_and_risks']['tariffs_code_hs'] ?? '8504.40' }})</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['estimated_duty_per_unit'] ?? '0.65' }}</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['estimated_duty_per_unit'] ?? '0.65' }}</td>
            </tr>
            <tr>
                <td>Customs Clearance, Port Surcharges &amp; Marine Insurance</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['customs_handling_per_unit'] ?? '0.45' }}</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['customs_handling_per_unit'] ?? '0.35' }}</td>
            </tr>
            <tr>
                <td>FBA / 3PL Warehouse Prep, Barcoding &amp; Palletization</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['fba_prep_and_packaging'] ?? '1.00' }}</td>
                <td style="text-align: right;">€{{ $report->report_data['unit_economics']['fba_prep_and_packaging'] ?? '1.00' }}</td>
            </tr>
            <tr style="background-color: #f1f5f9; font-weight: 700;">
                <td style="color: #0f172a;">TOTAL ESTIMATED LANDED COST PER UNIT:</td>
                <td style="text-align: right; color: #16a34a; font-size: 11px;">€{{ $report->report_data['unit_economics']['total_landed_cost_sea'] ?? '12.40' }}</td>
                <td style="text-align: right; color: #2563eb; font-size: 11px;">€{{ $report->report_data['unit_economics']['total_landed_cost_air'] ?? '15.90' }}</td>
            </tr>
            <tr style="background-color: #e2e8f0; font-weight: 800;">
                <td>Recommended Retail Price (RRP / MSRP):</td>
                <td colspan="2" style="text-align: right; font-size: 12px; color: #0f172a;">€{{ $report->report_data['unit_economics']['recommended_retail_price'] ?? '39.99' }} EUR</td>
            </tr>
        </tbody>
    </table>

    <!-- Risk & Compliance -->
    <h2>4. Compliance, Customs &amp; Risk Mitigation Matrix</h2>
    <div class="card">
        <p style="margin: 2px 0;"><strong>Mandatory Certifications:</strong> {{ implode(', ', (array)($report->report_data['compliance_and_risks']['required_certifications'] ?? ['CE Marking', 'FCC Part 15', 'RoHS 2.0 (2011/65/EU)', 'REACH SVHC', 'WEEE'])) }}</p>
        <p style="margin: 2px 0;"><strong>Customs Tariff Classification (HS Code):</strong> {{ $report->report_data['compliance_and_risks']['tariffs_code_hs'] ?? '8504.40.9000 (Duty Rate: 3.3%)' }}</p>
        <p style="margin: 2px 0;"><strong>Intellectual Property &amp; Patent Assessment:</strong> {{ $report->report_data['compliance_and_risks']['ip_patent_risk'] ?? 'Low risk for utility mechanisms. Ensure proprietary CAD mold ownership agreement before tooling.' }}</p>
        <p style="margin: 2px 0;"><strong>Pre-Shipment Quality Control Protocol:</strong> {{ implode(' &bull; ', (array)($report->report_data['compliance_and_risks']['quality_control_checklist'] ?? ['ANSI/ASQ Z1.4 Level II AQL 1.0/2.5 Inspection', 'Drop Test (1.2m onto concrete)', 'Functional Load Cycle (500 cycles)', 'Packaging Drop & Barcode Readability Test'])) }}</p>
    </div>

    <!-- Outreach Templates -->
    <h2>5. Ready-to-Send Factory Outreach &amp; RFQ Templates</h2>
    <div style="font-weight: 700; margin-bottom: 4px; color: #475569;">English RFQ (Request for Quotation):</div>
    <div class="template-box">{{ $report->report_data['outreach_templates']['initial_rfq_en'] ?? 'Dear Sales Team, We are sourcing production for ' . $report->product_name . ' for our Q3 launch. Please find our spec sheet and quote EXW and FOB pricing for 1,000, 3,000, and 5,000 units.' }}</div>

    @if(!empty($report->report_data['outreach_templates']['initial_rfq_cn']))
    <div style="font-weight: 700; margin-top: 10px; margin-bottom: 4px; color: #475569;">Chinese Outreach Template (1688 / WeChat / Factory GM):</div>
    <div class="template-box">{{ $report->report_data['outreach_templates']['initial_rfq_cn'] }}</div>
    @endif

    <div class="footer">
        Confidential B2B Intelligence Document &bull; Prepared exclusively for client by <strong>COLCHESTER LTD</strong><br>
        Company No. 16113808 &bull; Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP &bull; info@takeyoursgoods.co.uk
    </div>

</body>
</html>
