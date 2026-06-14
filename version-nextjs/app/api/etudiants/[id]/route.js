import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  // Only allow user to update their own data
  if (session.id != id) {
    return NextResponse.json({ error: 'Unauthorized: Vous ne pouvez modifier que vos propres données' }, { status: 403 });
  }

  try {
    // Validate input
    if (body.note1 !== undefined && (body.note1 < 0 || body.note1 > 20)) {
      return NextResponse.json({ error: 'note1 doit être entre 0 et 20' }, { status: 400 });
    }
    if (body.note2 !== undefined && (body.note2 < 0 || body.note2 > 20)) {
      return NextResponse.json({ error: 'note2 doit être entre 0 et 20' }, { status: 400 });
    }
    if (body.longitude !== undefined && (body.longitude < -180 || body.longitude > 180)) {
      return NextResponse.json({ error: 'longitude doit être entre -180 et 180' }, { status: 400 });
    }
    if (body.latitude !== undefined && (body.latitude < -90 || body.latitude > 90)) {
      return NextResponse.json({ error: 'latitude doit être entre -90 et 90' }, { status: 400 });
    }

    const allowedFields = ['note1', 'note2', 'longitude', 'latitude'];
    const updates = [];
    const values = [];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    // If notes are updated, recalculate moyenne
    if (body.note1 !== undefined || body.note2 !== undefined) {
      const [currentStudent] = await pool.execute('SELECT note1, note2 FROM etudiants WHERE id = ?', [id]);
      const note1 = body.note1 !== undefined ? body.note1 : currentStudent[0].note1;
      const note2 = body.note2 !== undefined ? body.note2 : currentStudent[0].note2;
      const moyenne = (note1 + note2) / 2.0;
      updates.push('moyenne = ?');
      values.push(moyenne);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Aucun champ à mettre à jour' }, { status: 400 });
    }

    values.push(id);
    await pool.execute(
      `UPDATE etudiants SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
