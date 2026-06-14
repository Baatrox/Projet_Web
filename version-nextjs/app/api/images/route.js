import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

function normalizeImageName(input, fallback = 'image') {
  const raw = String(input || fallback)
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  return (raw || fallback).slice(0, 20);
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const [rows] = await pool.execute('SELECT id, name, type, size, bin_img FROM images');
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
    };

    const images = rows.map(img => {
      const mimeType = mimeTypes[img.type.toLowerCase()] || 'application/octet-stream';
      const base64 = Buffer.from(img.bin_img).toString('base64');
      return {
        id: img.id,
        name: img.name,
        type: img.type,
        mimeType,
        size: img.size,
        dataUrl: `data:${mimeType};base64,${base64}`,
      };
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const rawName = formData.get('name') || file.name;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 10MB)' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé' }, { status: 400 });
    }

    const name = normalizeImageName(rawName);
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop() || 'jpg';

    // For profile photos, delete existing one first to avoid duplicates
    if (name.startsWith('profile_')) {
      await pool.execute('DELETE FROM images WHERE name = ?', [name]);
    }

    const [result] = await pool.execute(
      'INSERT INTO images (name, type, size, bin_img) VALUES (?, ?, ?, ?)',
      [name, ext.toLowerCase(), file.size, buffer]
    );

    return NextResponse.json({ success: true, id: result.insertId, name });
  } catch (error) {
    console.error('Error uploading image:', error);
    if (error.code === 'ER_DATA_TOO_LONG') {
      return NextResponse.json(
        { error: "Nom d'image trop long. Le nom a été réduit automatiquement ou doit faire moins de 20 caractères." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
