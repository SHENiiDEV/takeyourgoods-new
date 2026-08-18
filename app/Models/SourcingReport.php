<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SourcingReport extends Model
{
    protected $fillable = [
        'user_id',
        'tier',
        'status',
        'title',
        'product_name',
        'product_category',
        'target_cost',
        'target_quantity',
        'destination_country',
        'specifications',
        'compliance_requirements',
        'cost_deducted',
        'report_data',
        'ai_model',
        'error_message',
    ];

    protected $casts = [
        'target_cost' => 'decimal:2',
        'cost_deducted' => 'decimal:2',
        'report_data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

