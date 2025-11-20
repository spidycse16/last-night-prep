<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'guest', 'description' => 'Read-only access to public content'],
            ['name' => 'job_seeker', 'description' => 'Full Q&A participation, profile management'],
            ['name' => 'recruiter', 'description' => 'Post authentic interview questions, scout talent'],
            ['name' => 'moderator', 'description' => 'Maintain content quality, enforce guidelines'],
            ['name' => 'admin', 'description' => 'Full system access, user management, platform configuration'],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']],
                [
                    'description' => $role['description'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}