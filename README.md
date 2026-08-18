# TakeYourGoods AI - Autonomous B2B Sourcing Platform

TakeYourGoods AI is a premium B2B SaaS platform engineered as an autonomous procurement agent for e-commerce sellers (Amazon, Shopify, wholesalers). It generates deep-dive Sourcing Dossiers featuring verified supplier shortlists, landed cost unit economics, compliance audits, and bilingual factory outreach documentation.

---

## 🚀 Key Features

- **High-Ticket Pricing & Services**:
  - Starter (€149): 5 verified factories + basic unit economics.
  - Pro (€499): 6 verified tier-A factories + full sea/air landed cost breakdown, HS code customs tariffs, ANSI/ASQ Z1.4 QC checklist, bilingual English/Chinese outreach scripts.
  - Enterprise Turnkey (€1,499): 8 high-capacity manufacturers + turnkey Tech Pack, BOM specs, CAD protocols & direct GM intro.
- **Prepaid EUR Wallet & Billing**:
  - Atomic wallet balance deductions.
  - Top-Up modal with presets (€149, €499, €1,499) and custom EUR amounts.
  - Official B2B Tax Invoices generated automatically as PDF with `PAID & VERIFIED` watermark and 0% Reverse Charge VAT.
- **Corporate Entity**:
  - **Company**: COLCHESTER LTD (Company No. 16113808)
  - **Address**: Dept 6898 126 East Ferry Road, Canary Wharf, London, England, E14 9FP
  - **Email**: info@takeyoursgoods.co.uk
- **Legal Suite (UK GDPR)**:
  - `/terms`: Terms of Service (UK Jurisdiction).
  - `/privacy`: Privacy Policy (UK GDPR compliance & brief anonymization).
  - `/refund`: 14-Day money-back guarantee for unspent wallet funds.
- **Transactional SMTP Emails**:
  - Welcome Email on user registration.
  - Top-Up confirmation with PDF invoice attached.
  - Sourcing Report ready notification.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 13 (PHP 8.4)
- **Frontend**: React 18, Inertia.js, Tailwind CSS, Lucide Icons, Framer Motion
- **Database**: SQLite
- **PDF Engine**: barryvdh/laravel-dompdf

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
composer install
npm install

# 2. Setup Environment
cp .env.example .env
php artisan key:generate

# 3. Database & Seed Demo Data
php artisan migrate:fresh --seed

# 4. Build Frontend Assets
npm run build

# 5. Start Server
php artisan serve --port=2929
```

**Demo User:**
- Email: `demo@takeyourgoods.co.uk`
- Password: `password`
