import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, login, nom, note1, note2, moyenne, longitude, latitude FROM etudiants WHERE id = ?',
      [session.id]
    );
    const students = rows;
    if (students.length === 0) {
      return NextResponse.json({ error: 'Étudiant introuvable' }, { status: 404 });
    }
    return NextResponse.json(students[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
