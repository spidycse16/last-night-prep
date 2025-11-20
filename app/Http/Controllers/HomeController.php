<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        // Fetch some demo questions with their answers
        $questions = DB::table('questions')
            ->select(
                'questions.question_id',
                'questions.title',
                'questions.difficulty',
                'questions.view_count',
                'questions.vote_count',
                'questions.answer_count',
                'questions.is_solved',
                'questions.created_at',
                'users.name as user_name'
            )
            ->join('users', 'questions.user_id', '=', 'users.id')
            ->orderBy('questions.view_count', 'desc')
            ->limit(6)
            ->get();

        // Fetch answers for each question
        $questionsWithAnswers = $questions->map(function ($question) {
            $answers = DB::table('answers')
                ->select(
                    'answers.answer_id',
                    'answers.body',
                    'answers.vote_count',
                    'answers.is_accepted',
                    'answers.created_at',
                    'users.name as user_name'
                )
                ->join('users', 'answers.user_id', '=', 'users.id')
                ->where('answers.question_id', $question->question_id)
                ->orderBy('answers.is_accepted', 'desc')
                ->orderBy('answers.vote_count', 'desc')
                ->get();

            $question->answers = $answers;
            return $question;
        });

        // Fetch some tags for the navbar
        $tags = DB::table('tags')
            ->select('tag_id', 'name')
            ->limit(20)
            ->get();

        return Inertia::render('Home', [
            'questions' => $questionsWithAnswers,
            'tags' => $tags,
        ]);
    }

    public function dashboard()
    {
        // Fetch random questions for the dashboard
        $randomQuestions = DB::table('questions')
            ->select(
                'questions.question_id',
                'questions.title',
                'questions.difficulty',
                'questions.view_count',
                'questions.vote_count',
                'questions.answer_count',
                'questions.is_solved',
                'questions.created_at',
                'users.name as user_name'
            )
            ->join('users', 'questions.user_id', '=', 'users.id')
            ->inRandomOrder()
            ->limit(5)
            ->get();

        // Fetch some tags for the question form
        $tags = DB::table('tags')
            ->select('tag_id', 'name')
            ->limit(20)
            ->get();

        return Inertia::render('Dashboard', [
            'randomQuestions' => $randomQuestions,
            'tags' => $tags,
        ]);
    }
}