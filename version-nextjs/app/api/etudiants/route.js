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
      'SELECT id, nom, note1, note2, moyenne, longitude, latitude FROM etudiants'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
