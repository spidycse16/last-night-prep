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
        Schema::table('users', function (Blueprint $table) {
            // Check if columns don't exist before adding them
            if (!Schema::hasColumn('users', 'username')) {
                $table->string('username')->unique()->after('email');
            }
            
            // Rename password to password_hash if it exists as 'password'
            if (Schema::hasColumn('users', 'password') && !Schema::hasColumn('users', 'password_hash')) {
                $table->renameColumn('password', 'password_hash');
            } elseif (!Schema::hasColumn('users', 'password_hash')) {
                $table->string('password_hash');
            }
            
            // Add email_verified if it doesn't exist
            if (!Schema::hasColumn('users', 'email_verified')) {
                $table->boolean('email_verified')->default(false)->after('email_verified_at');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'username')) {
                $table->dropColumn('username');
            }
            
            if (Schema::hasColumn('users', 'password_hash') && !Schema::hasColumn('users', 'password')) {
                $table->renameColumn('password_hash', 'password');
            }
            
            if (Schema::hasColumn('users', 'email_verified')) {
                $table->dropColumn('email_verified');
            }
        });
    }
};