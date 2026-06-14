'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login ou mot de passe incorrect');
        return;
      }
      router.push('/dashboard');
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">MR</div>
          <div>
            <h1 className="text-lg font-bold text-primary">Master RSI</h1>
            <p className="text-xs text-muted">Langage du Web</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary">Connexion</h2>
            <p className="text-sm text-muted mt-1">Accédez à votre portfolio</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-text mb-1.5">Login</label>
              <input
                id="login"
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
                className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                placeholder="Entrez votre login"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-1.5">Mot de passe</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm text-text focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-[#c1121f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-primary text-white text-center text-sm py-4">
        © 2025–2026 Université Hassan 1er — FSTS Settat
      </footer>
    </>
  );
}
