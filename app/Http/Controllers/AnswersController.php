<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AnswersController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $questionId)
    {
        $request->validate([
            'body' => 'required|string|min:10',
        ]);

        // Insert the answer
        $answerId = DB::table('answers')->insertGetId([
            'question_id' => $questionId,
            'user_id' => Auth::id(),
            'body' => $request->body,
            'vote_count' => 0,
            'is_accepted' => false,
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ], 'answer_id');

        // Update the answer count for the question
        DB::table('questions')
            ->where('question_id', $questionId)
            ->increment('answer_count');

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}