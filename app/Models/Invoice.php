<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'user_id',
        'transaction_id',
        'invoice_number',
        'amount',
        'currency',
        'vat_rate',
        'vat_amount',
        'company_name',
        'company_number',
        'company_address',
        'company_email',
        'client_name',
        'client_company',
        'client_vat',
        'client_email',
        'client_address',
        'service_name',
        'status',
        'pdf_path',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'vat_rate' => 'decimal:2',
        'vat_amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}

