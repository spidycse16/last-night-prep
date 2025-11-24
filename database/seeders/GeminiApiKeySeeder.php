<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeminiApiKeySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            $this->command->warn('GEMINI_API_KEY not set in .env file. Skipping Gemini API key seeding.');
            return;
        }

        // Check if Gemini API key already exists
        $existingKey = DB::table('api_keys')->where('provider', 'gemini')->first();

        if (!$existingKey) {
            // Insert Google Gemini API key
            DB::table('api_keys')->insert([
                [
                    'provider' => 'gemini',
                    'api_key' => $apiKey,
                    'name' => 'Google Gemini API Key',
                    'is_active' => true,
                    'daily_limit' => 1000,
                    'daily_usage' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            ]);
        } else {
            // Update existing key
            DB::table('api_keys')
                ->where('provider', 'gemini')
                ->update([
                    'api_key' => $apiKey,
                    'name' => 'Google Gemini API Key',
                    'is_active' => true,
                    'updated_at' => now(),
                ]);
        }
    }
}