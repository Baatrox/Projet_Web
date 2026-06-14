import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { quiz, score } = await request.json();

    // Validate quiz number
    if (!quiz || ![1, 2].includes(quiz)) {
      return NextResponse.json({ error: 'Quiz invalide. Doit être 1 ou 2' }, { status: 400 });
    }

    // Validate score
    if (score === undefined || score === null) {
      return NextResponse.json({ error: 'Score requis' }, { status: 400 });
    }
    if (typeof score !== 'number' || score < 0 || score > 20) {
      return NextResponse.json({ error: 'Score doit être un nombre entre 0 et 20' }, { status: 400 });
    }

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

    return NextResponse.json({ success: true, score });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
