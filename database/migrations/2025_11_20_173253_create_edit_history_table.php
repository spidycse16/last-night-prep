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
        Schema::create('edit_history', function (Blueprint $table) {
            $table->id('edit_id');
            $table->unsignedBigInteger('target_id'); // question_id or answer_id
            $table->enum('target_type', ['question', 'answer']);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('previous_content')->nullable();
            $table->text('new_content')->nullable();
            $table->string('edit_summary')->nullable();
            $table->timestamps(); // This creates created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edit_history');
    }
};