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
        // Add foreign key constraint for questions.company_id
        Schema::table('questions', function (Blueprint $table) {
            $table->foreign('company_id')->references('company_id')->on('companies')->onDelete('set null');
        });

        // Add foreign key constraint for questions.accepted_answer_id
        Schema::table('questions', function (Blueprint $table) {
            $table->foreign('accepted_answer_id')->references('answer_id')->on('answers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropForeign(['accepted_answer_id']);
        });
    }
};