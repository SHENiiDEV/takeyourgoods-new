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
        Schema::create('sourcing_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('tier', ['starter', 'pro', 'enterprise']);
            $table->enum('status', ['draft', 'processing', 'completed', 'failed'])->default('processing');
            $table->string('title');
            $table->string('product_name');
            $table->string('product_category')->nullable();
            $table->decimal('target_cost', 10, 2)->nullable();
            $table->integer('target_quantity')->nullable();
            $table->string('destination_country')->default('United States');
            $table->text('specifications')->nullable();
            $table->text('compliance_requirements')->nullable();
            $table->decimal('cost_deducted', 10, 2)->default(0.00);
            $table->json('report_data')->nullable();
            $table->string('ai_model')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sourcing_reports');
    }
};
