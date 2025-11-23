<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateApiKey extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api-key:update {provider} {key}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update API key for a provider';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $provider = $this->argument('provider');
        $key = $this->argument('key');

        // Check if provider exists
        $apiKey = DB::table('api_keys')->where('provider', $provider)->first();

        if (!$apiKey) {
            $this->error("Provider {$provider} not found in the database.");
            return 1;
        }

        // Update the API key
        DB::table('api_keys')
            ->where('provider', $provider)
            ->update([
                'api_key' => $key,
                'updated_at' => now()
            ]);

        $this->info("API key for {$provider} updated successfully.");
        return 0;
    }
}