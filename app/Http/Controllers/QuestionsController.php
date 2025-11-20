<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DB::table('questions')
            ->select(
                'questions.question_id',
                'questions.title',
                'questions.difficulty',
                'questions.view_count',
                'questions.vote_count',
                'questions.answer_count',
                'questions.is_solved',
                'questions.created_at',
                'users.name as user_name',
                'users.id as user_id'
            )
            ->join('users', 'questions.user_id', '=', 'users.id')
            ->where('questions.status', 'open');

        // Filter by user if specified
        if ($request->has('user')) {
            $query->where('users.id', $request->user);
        }

        // Filter by tag if specified
        if ($request->has('tag')) {
            $query->join('question_tags', 'questions.question_id', '=', 'question_tags.question_id')
                ->join('tags', 'question_tags.tag_id', '=', 'tags.tag_id')
                ->where('tags.name', $request->tag);
        }

        // Filter by answered by user if specified
        if ($request->has('answered_by')) {
            $query->join('answers', 'questions.question_id', '=', 'answers.question_id')
                ->where('answers.user_id', $request->answered_by)
                ->groupBy(
                    'questions.question_id',
                    'questions.title',
                    'questions.difficulty',
                    'questions.view_count',
                    'questions.vote_count',
                    'questions.answer_count',
                    'questions.is_solved',
                    'questions.created_at',
                    'users.name',
                    'users.id'
                );
        }

        // Fetch questions with pagination
        $questions = $query->orderBy('questions.created_at', 'desc')
            ->paginate(10)
            ->appends($request->except('page'));

        return Inertia::render('Questions/Index', [
            'questions' => $questions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Fetch tags for the question form
        $tags = DB::table('tags')
            ->select('tag_id', 'name')
            ->get();

        return Inertia::render('Questions/Create', [
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'difficulty' => 'required|in:easy,medium,hard',
            'tags' => 'array',
            'tags.*' => 'exists:tags,tag_id',
        ]);

        // Insert the question
        $questionId = DB::table('questions')->insertGetId([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'difficulty' => $request->difficulty,
            'is_anonymous' => false,
            'view_count' => 0,
            'vote_count' => 0,
            'answer_count' => 0,
            'is_solved' => false,
            'status' => 'open',
            'created_at' => now(),
            'updated_at' => now(),
        ], 'question_id');

        // Insert question tags
        if ($request->tags) {
            foreach ($request->tags as $tagId) {
                DB::table('question_tags')->insert([
                    'question_id' => $questionId,
                    'tag_id' => $tagId,
                ]);
            }
        }

        return redirect()->route('questions.show', $questionId);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Fetch the question
        $question = DB::table('questions')
            ->select(
                'questions.question_id',
                'questions.title',
                'questions.difficulty',
                'questions.view_count',
                'questions.vote_count',
                'questions.answer_count',
                'questions.is_solved',
                'questions.created_at',
                'users.name as user_name',
                'users.id as user_id'
            )
            ->join('users', 'questions.user_id', '=', 'users.id')
            ->where('questions.question_id', $id)
            ->where('questions.status', 'open')
            ->first();

        if (!$question) {
            return redirect()->route('questions.index');
        }

        // Fetch answers for the question
        $answers = DB::table('answers')
            ->select(
                'answers.answer_id',
                'answers.body',
                'answers.vote_count',
                'answers.is_accepted',
                'answers.created_at',
                'users.name as user_name',
                'users.id as user_id'
            )
            ->join('users', 'answers.user_id', '=', 'users.id')
            ->where('answers.question_id', $id)
            ->where('answers.status', 'active')
            ->orderBy('answers.is_accepted', 'desc')
            ->orderBy('answers.vote_count', 'desc')
            ->get();

        // Fetch tags for the question
        $questionTags = DB::table('question_tags')
            ->join('tags', 'question_tags.tag_id', '=', 'tags.tag_id')
            ->where('question_tags.question_id', $id)
            ->select('tags.name')
            ->get();

        return Inertia::render('Questions/Show', [
            'question' => $question,
            'answers' => $answers,
            'tags' => $questionTags,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $question = DB::table('questions')
            ->where('question_id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$question) {
            return redirect()->route('questions.index');
        }

        // Fetch tags for the question
        $questionTags = DB::table('question_tags')
            ->where('question_id', $id)
            ->pluck('tag_id')
            ->toArray();

        // Fetch all tags
        $tags = DB::table('tags')
            ->select('tag_id', 'name')
            ->get();

        return Inertia::render('Questions/Edit', [
            'question' => $question,
            'questionTags' => $questionTags,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'difficulty' => 'required|in:easy,medium,hard',
            'tags' => 'array',
            'tags.*' => 'exists:tags,tag_id',
        ]);

        // Update the question
        DB::table('questions')
            ->where('question_id', $id)
            ->where('user_id', Auth::id())
            ->update([
                'title' => $request->title,
                'difficulty' => $request->difficulty,
                'updated_at' => now()
            ]);

        // Delete existing question tags
        DB::table('question_tags')
            ->where('question_id', $id)
            ->delete();

        // Insert new question tags
        if ($request->tags) {
            foreach ($request->tags as $tagId) {
                DB::table('question_tags')->insert([
                    'question_id' => $id,
                    'tag_id' => $tagId,
                ]);
            }
        }

        return redirect()->route('questions.show', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Soft delete the question by updating its status
        DB::table('questions')
            ->where('question_id', $id)
            ->where('user_id', Auth::id()) // Only allow users to delete their own questions
            ->update([
                'status' => 'deleted',
                'updated_at' => now()
            ]);

        return redirect()->route('questions.index');
    }
}