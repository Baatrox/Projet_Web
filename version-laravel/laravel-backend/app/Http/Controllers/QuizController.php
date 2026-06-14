<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'quiz' => 'required|integer|in:1,2',
            'score' => 'required|integer|min:0|max:20',
        ]);

        $user = $request->user();
        $quiz = $request->quiz;

        if ($quiz === 1) {
            \DB::statement('UPDATE etudiants SET note1 = ?, moyenne = (note1 + note2) / 2.0 WHERE id = ?', [
                $request->score,
                $user->id,
            ]);
        } else {
            \DB::statement('UPDATE etudiants SET note2 = ?, moyenne = (note1 + note2) / 2.0 WHERE id = ?', [
                $request->score,
                $user->id,
            ]);
        }

        return response()->json(['success' => true, 'score' => $request->score]);
    }
}
