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
        Schema::create('questions', function (Blueprint $table) {
            $table->id('question_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->enum('difficulty', ['easy', 'medium', 'hard']);
            $table->unsignedBigInteger('company_id')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->unsignedInteger('view_count')->default(0);
            $table->integer('vote_count')->default(0);
            $table->unsignedInteger('answer_count')->default(0);
            $table->boolean('is_solved')->default(false);
            $table->unsignedBigInteger('accepted_answer_id')->nullable();
            $table->enum('status', ['open', 'closed', 'deleted'])->default('open');
            $table->timestamp('closed_at')->nullable();
            $table->timestamps(); // This creates created_at and updated_at
            
            // Note: Foreign key constraints for company_id and accepted_answer_id will be added in a separate migration
            // after all tables are created
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};