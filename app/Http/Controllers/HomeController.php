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

        // Format questions for the frontend
        $formattedQuestions = $questions->map(function ($question) {
            // Get tags for this question
            $tags = DB::table('question_tags')
                ->join('tags', 'question_tags.tag_id', '=', 'tags.tag_id')
                ->where('question_tags.question_id', $question->question_id)
                ->pluck('tags.name')
                ->toArray();

            // Get answers for this question
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
                ->limit(3) // Limit to 3 answers for homepage
                ->get();

            // Format answers
            $formattedAnswers = $answers->map(function ($answer) {
                return [
                    'id' => $answer->answer_id,
                    'content' => $answer->body,
                    'author' => $answer->user_name,
                    'likes' => $answer->vote_count,
                    'is_accepted' => $answer->is_accepted
                ];
            });

            return [
                'id' => $question->question_id,
                'title' => $question->title,
                'content' => 'This is a sample question content. In a real implementation, this would show the full question details.',
                'tags' => $tags,
                'likes' => $question->vote_count,
                'answers' => $question->answer_count,
                'answers_data' => $formattedAnswers
            ];
        });

        // Fetch some tags for the navbar
        $tags = DB::table('tags')
            ->select('tag_id', 'name')
            ->limit(20)
            ->get();

        return Inertia::render('Home', [
            'questions' => $formattedQuestions,
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

        // Format questions for the frontend with answers
        $formattedQuestions = $randomQuestions->map(function ($question) {
            // Get answers for this question
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
                ->limit(3) // Limit to 3 answers for dashboard
                ->get();

            // Format answers
            $formattedAnswers = $answers->map(function ($answer) {
                return [
                    'id' => $answer->answer_id,
                    'content' => $answer->body,
                    'author' => $answer->user_name,
                    'likes' => $answer->vote_count,
                    'is_accepted' => $answer->is_accepted
                ];
            });

            return [
                'id' => $question->question_id,
                'title' => $question->title,
                'content' => 'This is a sample question content. In a real implementation, this would show the full question details.',
                'likes' => $question->vote_count,
                'answers' => $question->answer_count,
                'answers_data' => $formattedAnswers
            ];
        });

        // Fetch some tags for the question form
        $tags = DB::table('tags')
            ->select('tag_id', 'name')
            ->limit(20)
            ->get();

        return Inertia::render('Dashboard', [
            'randomQuestions' => $formattedQuestions,
            'tags' => $tags,
        ]);
    }
}