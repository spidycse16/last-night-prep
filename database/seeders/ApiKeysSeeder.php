<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApiKeysSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $apiKey = env('OPENAI_API_KEY');

        if (!$apiKey) {
            $this->command->warn('OPENAI_API_KEY not set in .env file. Skipping OpenAI API key seeding.');
            return;
        }

        DB::table('api_keys')->insert([
            [
                'provider' => 'openai',
                'api_key' => $apiKey,
                'name' => 'Default OpenAI Key',
                'is_active' => true,
                'daily_limit' => 1000,
                'daily_usage' => 0,
                'last_used_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
