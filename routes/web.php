<?php

use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionsController;
use App\Http\Controllers\AnswersController;
use App\Http\Controllers\AiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Debug routes (no auth required for testing)
Route::get('/debug/ai-keys', function () {
    $keys = DB::table('api_keys')
        ->where('is_active', true)
        ->where('daily_limit', '>', DB::raw('daily_usage'))
        ->orderBy('daily_usage', 'asc')
        ->get();
    
    return response()->json([
        'keys' => $keys,
        'count' => $keys->count()
    ]);
});

Route::get('/debug/test-gemini', [AiController::class, 'testGemini']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    
    // Questions routes
    Route::resource('questions', QuestionsController::class);
    
    // Answers routes
    Route::post('/questions/{question}/answers', [AnswersController::class, 'store'])->name('answers.store');
    
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // AI routes
    Route::post('/ai/answer', [AiController::class, 'getAnswer'])->name('ai.answer');
});

// Social Authentication Routes
Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirectToProvider'])->name('social.redirect');
Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback'])->name('social.callback');

require __DIR__.'/auth.php';