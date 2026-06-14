import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/lib/db';

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
    const name = formData.get('name') || file.name;

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

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop() || 'jpg';

    const [result] = await pool.execute(
      'INSERT INTO images (name, type, size, bin_img) VALUES (?, ?, ?, ?)',
      [name, ext.toLowerCase(), file.size, buffer]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
