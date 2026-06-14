'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, apiRequest } from '@/lib/api';
import Link from 'next/link';

export default function DashboardHome() {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/'); return; }
    apiRequest('/etudiants/me')
      .then(data => { setNom(data.nom); setLoading(false); })
      .catch(() => router.push('/'));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">Bienvenue, {nom}</h1>
        <p className="text-muted">
          Ce portfolio interactif présente mes projets et compétences développés dans le cadre du module <strong>Langage du Web</strong>.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/dashboard/about" className="block group">
          <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4"><span className="text-2xl">👤</span></div>
            <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">À propos de moi</h2>
            <p className="text-muted text-sm">Mon CV, mes résultats académiques et ma localisation.</p>
          </div>
        </Link>
        <Link href="/dashboard/projects" className="block group">
          <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4"><span className="text-2xl">📁</span></div>
            <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Mes projets</h2>
            <p className="text-muted text-sm">Découvrez mes réalisations : matrices, quiz, statistiques et plus.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
