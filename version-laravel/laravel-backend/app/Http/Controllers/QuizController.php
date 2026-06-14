<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\QuizService;

class QuizController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'quiz' => 'required|integer|in:1,2',
            'answers' => 'required|array',
        ]);

        $user = $request->user();
        $quiz = $request->quiz;
        $answers = $request->answers;

        try {
            // Calculate score on server (student cannot cheat)
            $result = QuizService::calculateQuizScore($quiz, $answers);
            $score = $result['score'];

            DB::transaction(function () use ($user, $quiz, $score) {
                if ($quiz === 1) {
                    DB::statement('UPDATE etudiants SET note1 = ?, moyenne = (note1 + note2) / 2.0 WHERE id = ?', [
                        $score,
                        $user->id,
                    ]);
                } else {
                    DB::statement('UPDATE etudiants SET note2 = ?, moyenne = (note1 + note2) / 2.0 WHERE id = ?', [
                        $score,
                        $user->id,
                    ]);
                }
            });

            return response()->json([
                'success' => true,
                'score' => $score,
                'correct' => $result['correct'],
                'total' => $result['total'],
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur lors de la sauvegarde du score'], 500);
        }
    }
}
