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
        Schema::create('api_keys', function (Blueprint $table) {
            $table->id();
            $table->string('provider'); // openai, anthropic, etc.
            $table->string('api_key');
            $table->string('name')->nullable(); // Descriptive name for the key
            $table->boolean('is_active')->default(true);
            $table->integer('daily_limit')->default(1000); // Daily request limit
            $table->integer('daily_usage')->default(0); // Current daily usage
            $table->timestamp('last_used_at')->nullable();
            $table->timestamps();
            
            $table->index(['provider', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_keys');
    }
};