'use client';

import Link from 'next/link';

const projects = [
  { id: 1, icon: '🔢', title: 'Manipulation de matrices avec Javascript', desc: 'Génération et opérations sur matrices (somme, produit) avec JavaScript pur.', href: '/dashboard/projects/matrices' },
  { id: 2, icon: '📄', title: 'Manipulation de formulaires avec les fichiers', desc: 'Gestion de données étudiants via fichiers texte avec PHP.', href: '/dashboard/projects/fichiers' },
  { id: 3, icon: '🖼️', title: 'Insertion et affichage d\'images dans une base de données', desc: 'Upload et affichage d\'images stockées en base MySQL.', href: '/dashboard/projects/images' },
  { id: 4, icon: '❓', title: 'Quiz', desc: 'Quiz interactifs sur JavaScript et PHP avec calcul de note.', href: '/dashboard/projects/quiz' },
  { id: 5, icon: '📊', title: 'Statistiques avec chartJS', desc: 'Visualisation des moyennes des étudiants avec Chart.js.', href: '/dashboard/projects/stats' },
  { id: 6, icon: '🗺️', title: 'Géolocalisation', desc: 'Carte interactive des étudiants avec Leaflet.js.', href: '/dashboard/projects/geo' },
];

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Mes Projets</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Link key={p.id} href={p.href} className="block group">
            <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 h-full hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h2 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{p.id}. {p.title}</h2>
              <p className="text-muted text-sm mb-4">{p.desc}</p>
              <span className="text-accent text-sm font-semibold group-hover:underline">Voir le projet →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
