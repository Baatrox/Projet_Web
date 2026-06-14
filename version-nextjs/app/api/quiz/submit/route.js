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
    } else {
      return NextResponse.json({ error: 'Quiz invalide' }, { status: 400 });
    }

    return NextResponse.json({ success: true, score });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
