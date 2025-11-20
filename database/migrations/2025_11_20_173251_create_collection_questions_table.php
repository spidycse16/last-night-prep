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
        Schema::create('collection_questions', function (Blueprint $table) {
            $table->unsignedBigInteger('collection_id');
            $table->foreignId('question_id')->constrained('questions', 'question_id')->onDelete('cascade');
            $table->unsignedInteger('order')->default(0);
            $table->primary(['collection_id', 'question_id']); // Composite primary key
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collection_questions');
    }
};