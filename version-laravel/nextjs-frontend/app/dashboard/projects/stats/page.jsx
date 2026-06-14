'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import StudentChart from '@/components/StudentChart';

export default function StatsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest('/etudiants').then(data => { setStudents(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Statistiques avec chartJS</h1>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8"><StudentChart students={students} /></div>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Détail des notes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-primary text-white">
              <th className="text-left px-4 py-3 font-semibold">Nom</th>
              <th className="text-center px-4 py-3 font-semibold">Note 1</th>
              <th className="text-center px-4 py-3 font-semibold">Note 2</th>
              <th className="text-center px-4 py-3 font-semibold">Moyenne</th>
            </tr></thead>
            <tbody>{students.map((s, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}>
                <td className="px-4 py-3 text-text font-medium">{s.nom}</td>
                <td className="px-4 py-3 text-text text-center">{s.note1}/20</td>
                <td className="px-4 py-3 text-text text-center">{s.note2}/20</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.moyenne >= 12 ? 'bg-green-100 text-green-700' : s.moyenne >= 10 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                    {s.moyenne.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
