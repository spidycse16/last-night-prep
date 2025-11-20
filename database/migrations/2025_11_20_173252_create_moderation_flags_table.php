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
        Schema::create('moderation_flags', function (Blueprint $table) {
            $table->id('flag_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // who flagged
            $table->unsignedBigInteger('target_id'); // question_id, answer_id, or comment_id
            $table->enum('target_type', ['question', 'answer', 'comment']);
            $table->enum('reason', ['spam', 'offensive', 'off-topic', 'other']);
            $table->enum('status', ['pending', 'resolved', 'dismissed'])->default('pending');
            $table->unsignedBigInteger('reviewed_by_user_id')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps(); // This creates created_at and updated_at
            
            $table->foreign('reviewed_by_user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moderation_flags');
    }
};