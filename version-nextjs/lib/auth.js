import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import pool from './db';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'master-rsi-secret-key-2025-2026');
const COOKIE_NAME = 'session';

export async function createSession(student) {
  const token = await new SignJWT({ ...student })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  return token;
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function authenticateStudent(login, password) {
  const [rows] = await pool.execute(
    'SELECT id, login, nom, note1, note2, moyenne, longitude, latitude FROM etudiants WHERE login = ? AND pass = SHA2(?, 256)',
    [login, password]
  );
  const students = rows;
  if (students.length === 0) return null;
  return students[0];
}
