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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notification_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // enum: answer, comment, upvote, badge, etc.
            $table->text('message');
            $table->string('link_url')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps(); // This creates created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};