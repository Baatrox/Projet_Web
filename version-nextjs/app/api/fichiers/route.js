import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'master_rsi2020.txt');
const HEADER = 'CNE;Nom;Prenom;Module1;Module2;Module3;Moyenne';

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, HEADER + '\n', 'utf-8');
  }
}

function parseLines(content) {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  // Remove header if present
  if (lines[0].startsWith('CNE')) {
    lines.shift();
  }

  return lines.map((line, index) => {
    const [cne, nom, prenom, note1, note2, note3, moyenne] = line.split(';');
    return { index, cne, nom, prenom, note1, note2, note3, moyenne };
  });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    await ensureFile();
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const students = parseLines(content);
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
    const n1 = Number(note1) || 0;
    const n2 = Number(note2) || 0;
    const n3 = Number(note3) || 0;
    const moyenne = Math.round(((n1 + n2 + n3) / 3) * 100) / 100;

    const line = `${cne};${nom};${prenom};${n1};${n2};${n3};${moyenne}\n`;
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

    // Find actual data line index (skip header)
    let dataLineIndex = -1;
    let dataCount = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '' || lines[i].startsWith('CNE')) {
        continue;
      }
      if (dataCount === index) {
        dataLineIndex = i;
        break;
      }
      dataCount++;
    }

    if (dataLineIndex === -1) {
      return NextResponse.json({ error: 'Index invalide' }, { status: 400 });
    }

    const n1 = Number(note1) || 0;
    const n2 = Number(note2) || 0;
    const n3 = Number(note3) || 0;
    const moyenne = Math.round(((n1 + n2 + n3) / 3) * 100) / 100;

    lines[dataLineIndex] = `${cne};${nom};${prenom};${n1};${n2};${n3};${moyenne}`;
    await fs.writeFile(DATA_FILE, lines.join('\n') + '\n', 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
