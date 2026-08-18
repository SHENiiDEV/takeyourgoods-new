<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('transaction_id')->nullable()->constrained()->nullOnDelete();
            $table->string('invoice_number')->unique();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('EUR');
            $table->decimal('vat_rate', 5, 2)->default(0.00);
            $table->decimal('vat_amount', 10, 2)->default(0.00);
            $table->string('company_name')->default('COLCHESTER LTD');
            $table->string('company_number')->default('16113808');
            $table->text('company_address');
            $table->string('company_email')->default('info@takeyoursgoods.co.uk');
            $table->string('client_name');
            $table->string('client_company')->nullable();
            $table->string('client_vat')->nullable();
            $table->string('client_email');
            $table->text('client_address')->nullable();
            $table->string('service_name');
            $table->string('status')->default('paid');
            $table->string('pdf_path')->nullable();
            $table->timestamp('paid_at');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
