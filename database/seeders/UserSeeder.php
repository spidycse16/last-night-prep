<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test admin user
        User::create([
            'name' => 'Admin User',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password_hash' => Hash::make('password'),
            'role' => 'admin',
            'account_status' => 'active',
            'email_verified' => true,
            'email_verified_at' => now(),
        ]);

        // Create a test job seeker user
        User::create([
            'name' => 'Job Seeker',
            'username' => 'jobseeker',
            'email' => 'jobseeker@example.com',
            'password_hash' => Hash::make('password'),
            'role' => 'job_seeker',
            'account_status' => 'active',
            'email_verified' => true,
            'email_verified_at' => now(),
        ]);
    }
}