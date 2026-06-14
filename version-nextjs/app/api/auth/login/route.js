import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authenticateStudent, createSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const { login, password } = await request.json();

    if (!login || !password) {
      return NextResponse.json({ error: 'Login et mot de passe requis' }, { status: 400 });
    }

    const student = await authenticateStudent(login, password);
    if (!student) {
      return NextResponse.json({ error: 'Login ou mot de passe incorrect' }, { status: 401 });
    }

    const token = await createSession(student);
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
