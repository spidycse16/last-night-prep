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
        Schema::create('interview_experiences', function (Blueprint $table) {
            $table->id('experience_id');
            $table->foreignId('company_id')->constrained('companies', 'company_id')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('role');
            $table->date('interview_date')->nullable();
            $table->json('rounds')->nullable();
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->nullable();
            $table->string('outcome')->nullable();
            $table->text('tips')->nullable();
            $table->integer('vote_count')->default(0);
            $table->timestamps(); // This creates created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interview_experiences');
    }
};