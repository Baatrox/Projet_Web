import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'master_rsi2020.txt');

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '', 'utf-8');
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    await ensureFile();
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    const students = lines.map((line, index) => {
      const [cne, nom, prenom, note1, note2, note3] = line.split('|');
      return { index, cne, nom, prenom, note1, note2, note3 };
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { cne, nom, prenom, note1, note2, note3 } = await request.json();

    if (!cne || !nom || !prenom || note1 === undefined) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    await ensureFile();
    const line = `${cne}|${nom}|${prenom}|${note1}|${note2}|${note3}\n`;
    await fs.appendFile(DATA_FILE, line, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const { index, cne, nom, prenom, note1, note2, note3 } = await request.json();

    await ensureFile();
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const lines = content.split('\n');

    if (index < 0 || index >= lines.length) {
      return NextResponse.json({ error: 'Index invalide' }, { status: 400 });
    }

    lines[index] = `${cne}|${nom}|${prenom}|${note1}|${note2}|${note3}`;
    await fs.writeFile(DATA_FILE, lines.join('\n'), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
