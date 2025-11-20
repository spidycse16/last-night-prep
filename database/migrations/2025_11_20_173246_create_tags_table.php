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
        Schema::create('tags', function (Blueprint $table) {
            $table->id('tag_id');
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->unsignedInteger('question_count')->default(0);
            $table->unsignedInteger('follower_count')->default(0);
            $table->timestamps(); // This creates created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};