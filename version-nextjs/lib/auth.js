import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import pool from './db';

// Validate JWT_SECRET environment variable
if (!process.env.JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
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
    'SELECT id, login, nom, note1, note2, moyenne, longitude, latitude, pass FROM etudiants WHERE login = ?',
    [login]
  );
  const students = rows;
  if (students.length === 0) return null;
  
  const student = students[0];
  const passwordMatch = await bcrypt.compare(password, student.pass);
  
  if (!passwordMatch) return null;
  
  // Return student data WITHOUT the password field
  const { pass, ...studentData } = student;
  return studentData;
}
