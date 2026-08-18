<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'name', 
    'surname', 
    'email', 
    'password', 
    'phone', 
    'date_of_birth', 
    'street_address', 
    'city', 
    'country', 
    'postcode', 
    'terms_accepted_at', 
    'wallet_balance', 
    'company_name', 
    'vat_number', 
    'billing_address'
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'terms_accepted_at' => 'datetime',
            'date_of_birth' => 'date',
            'password' => 'hashed',
            'wallet_balance' => 'decimal:2',
        ];
    }


    public function transactions()
    {
        return $this->hasMany(Transaction::class)->latest();
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class)->latest();
    }

    public function sourcingReports()
    {
        return $this->hasMany(SourcingReport::class)->latest();
    }

    public function hasSufficientBalance(float $amount): bool
    {
        return (float)$this->wallet_balance >= $amount;
    }
}

