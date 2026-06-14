import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';
import { calculateQuizScore } from '@/lib/quizService';

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { quiz, answers } = await request.json();

    // Validate quiz number
    if (!quiz || ![1, 2].includes(quiz)) {
      return NextResponse.json({ error: 'Quiz invalide. Doit être 1 ou 2' }, { status: 400 });
    }

    // Validate answers object
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Réponses requises' }, { status: 400 });
    }

    // Calculate score on server (student cannot cheat)
    const result = calculateQuizScore(quiz, answers);
    const score = result.score;

    // Update database with calculated score
    if (quiz === 1) {
      await pool.execute(
        'UPDATE etudiants SET note1 = ?, moyenne = (note1 + note2) / 2.0 WHERE id = ?',
        [score, session.id]
      );
    } else if (quiz === 2) {
      await pool.execute(
        'UPDATE etudiants SET note2 = ?, moyenne = (note1 + note2) / 2.0 WHERE id = ?',
        [score, session.id]
      );
    }

    return NextResponse.json({ 
      success: true, 
      score,
      correct: result.correct,
      total: result.total,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
