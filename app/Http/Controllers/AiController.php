<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AiController extends Controller
{
    /**
     * Get an AI answer for a question
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAnswer(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:1000',
            'question_id' => 'required|integer'
        ]);

        try {
            // Get available API keys
            $apiKeys = $this->getAvailableApiKeys();
            
            if ($apiKeys->isEmpty()) {
                return response()->json([
                    'error' => 'No API keys available. Please add API keys in the admin panel.'
                ], 503);
            }

            // Try each API key until one works
            foreach ($apiKeys as $apiKey) {
                $response = $this->callAiService($apiKey, $request->question);
                
                if ($response['success']) {
                    // Update usage count for the API key
                    $this->updateApiKeyUsage($apiKey->id);
                    
                    return response()->json([
                        'answer' => $response['answer'],
                        'provider' => $apiKey->provider,
                        'question_id' => $request->question_id
                    ]);
                }
                
                // If we get a rate limit error, mark this key as potentially exhausted
                if ($response['rate_limited']) {
                    $this->markApiKeyAsExhausted($apiKey->id);
                    continue;
                }
            }

            return response()->json([
                'error' => 'All API keys have exceeded their quotas. Please try again later or add more API keys.'
            ], 503);
            
        } catch (\Exception $e) {
            Log::error('AI Controller Error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate AI answer: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Test method for debugging
     */
    public function testGemini()
    {
        $apiKey = DB::table('api_keys')->where('provider', 'gemini')->first();
        
        if (!$apiKey) {
            return response()->json(['error' => 'No Gemini API key found']);
        }
        
        $result = $this->callAiService($apiKey, 'What is Laravel?');
        
        return response()->json($result);
    }

    /**
     * Get available API keys ordered by load balancing logic
     *
     * @return \Illuminate\Support\Collection
     */
    private function getAvailableApiKeys()
    {
        return DB::table('api_keys')
            ->where('is_active', true)
            ->where('daily_limit', '>', DB::raw('daily_usage'))
            ->orderBy('daily_usage', 'asc') // Load balancing by usage
            ->get();
    }

    /**
     * Call the AI service with the given API key
     *
     * @param object $apiKey
     * @param string $question
     * @return array
     */
    private function callAiService($apiKey, $question)
    {
        try {
            switch ($apiKey->provider) {
                case 'openai':
                    return $this->callOpenAi($apiKey, $question);
                case 'anthropic':
                    return $this->callAnthropic($apiKey, $question);
                case 'gemini':
                    return $this->callGemini($apiKey, $question);
                default:
                    return [
                        'success' => false,
                        'rate_limited' => false,
                        'answer' => null
                    ];
            }
        } catch (\Exception $e) {
            Log::error("AI Service Error ({$apiKey->provider}): " . $e->getMessage());
            return [
                'success' => false,
                'rate_limited' => false,
                'answer' => null
            ];
        }
    }

    /**
     * Call Google Gemini API
     *
     * @param object $apiKey
     * @param string $question
     * @return array
     */
    private function callGemini($apiKey, $question)
    {
        try {
            // Use the correct model name for Gemini
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->timeout(30)->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey->api_key}", [
                'contents' => [
                    [
                        'parts' => [
                            [
                                'text' => "You are a helpful assistant that answers technical interview questions. Provide clear, concise, and accurate answers.\n\nQuestion: {$question}"
                            ]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'maxOutputTokens' => 500,
                    'temperature' => 0.7
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $answer = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'No answer generated';
                return [
                    'success' => true,
                    'rate_limited' => false,
                    'answer' => $answer
                ];
            }

            // Check for rate limiting
            if ($response->status() === 429) {
                return [
                    'success' => false,
                    'rate_limited' => true,
                    'answer' => null
                ];
            }

            // Log error for debugging
            Log::error('Gemini API Error: ' . $response->body());
            
            return [
                'success' => false,
                'rate_limited' => false,
                'answer' => null
            ];
        } catch (\Exception $e) {
            Log::error('Gemini API Exception: ' . $e->getMessage());
            return [
                'success' => false,
                'rate_limited' => false,
                'answer' => null
            ];
        }
    }

    /**
     * Call OpenAI API
     *
     * @param object $apiKey
     * @param string $question
     * @return array
     */
    private function callOpenAi($apiKey, $question)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey->api_key,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a helpful assistant that answers technical interview questions. Provide clear, concise, and accurate answers.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $question
                    ]
                ],
                'max_tokens' => 500,
                'temperature' => 0.7
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'rate_limited' => false,
                    'answer' => $data['choices'][0]['message']['content'] ?? 'No answer generated'
                ];
            }

            // Check for rate limiting
            if ($response->status() === 429) {
                return [
                    'success' => false,
                    'rate_limited' => true,
                    'answer' => null
                ];
            }

            // Log error for debugging
            Log::error('OpenAI API Error: ' . $response->body());
            
            return [
                'success' => false,
                'rate_limited' => false,
                'answer' => null
            ];
        } catch (\Exception $e) {
            Log::error('OpenAI API Exception: ' . $e->getMessage());
            return [
                'success' => false,
                'rate_limited' => false,
                'answer' => null
            ];
        }
    }

    /**
     * Call Anthropic API
     *
     * @param object $apiKey
     * @param string $question
     * @return array
     */
    private function callAnthropic($apiKey, $question)
    {
        try {
            $response = Http::withHeaders([
                'x-api-key' => $apiKey->api_key,
                'Content-Type' => 'application/json',
                'anthropic-version' => '2023-06-01'
            ])->timeout(30)->post('https://api.anthropic.com/v1/messages', [
                'model' => 'claude-3-haiku-20240307',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => "Answer this technical interview question: {$question}"
                    ]
                ],
                'max_tokens' => 500
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'rate_limited' => false,
                    'answer' => $data['content'][0]['text'] ?? 'No answer generated'
                ];
            }

            // Check for rate limiting
            if ($response->status() === 429) {
                return [
                    'success' => false,
                    'rate_limited' => true,
                    'answer' => null
                ];
            }

            // Log error for debugging
            Log::error('Anthropic API Error: ' . $response->body());
            
            return [
                'success' => false,
                'rate_limited' => false,
                'answer' => null
            ];
        } catch (\Exception $e) {
            Log::error('Anthropic API Exception: ' . $e->getMessage());
            return [
                'success' => false,
                'rate_limited' => false,
                'answer' => null
            ];
        }
    }

    /**
     * Update API key usage count
     *
     * @param int $apiKeyId
     * @return void
     */
    private function updateApiKeyUsage($apiKeyId)
    {
        DB::table('api_keys')
            ->where('id', $apiKeyId)
            ->increment('daily_usage');
    }

    /**
     * Mark API key as potentially exhausted
     *
     * @param int $apiKeyId
     * @return void
     */
    private function markApiKeyAsExhausted($apiKeyId)
    {
        DB::table('api_keys')
            ->where('id', $apiKeyId)
            ->update([
                'last_used_at' => now(),
                'daily_usage' => DB::raw('daily_limit') // Mark as exhausted
            ]);
    }
}