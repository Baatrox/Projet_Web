'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import GeoMap from '@/components/GeoMap';

export default function GeoPage() {
  const [students, setStudents] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest('/etudiants')
      .then(data => {
        // Filter students with valid coordinates (not null/undefined)
        setStudents(data.filter(s => s.longitude !== null && s.longitude !== undefined && s.latitude !== null && s.latitude !== undefined));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        setLoading(false);
      });
    apiRequest('/etudiants/me')
      .then(data => setCurrentId(data.id))
      .catch(err => console.error('Error fetching current student:', err));
  }, []);

  async function handlePositionUpdate(lat, lng) {
    try {
      await apiRequest(`/etudiants/${currentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: lat, longitude: lng })
      });
      
      // Refresh the students list
      const data = await apiRequest('/etudiants');
      setStudents(data.filter(s => s.longitude !== null && s.longitude !== undefined && s.latitude !== null && s.latitude !== undefined));
      
      alert('Position mise à jour avec succès !');
    } catch (error) {
      console.error('Error updating position:', error);
      alert('Erreur lors de la mise à jour');
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Géolocalisation des étudiants</h1>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <GeoMap students={students} currentStudentId={currentId} onPositionUpdate={handlePositionUpdate} />
      </div>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Étudiants localisés</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-primary text-white">
              <th className="text-left px-4 py-3 font-semibold">Nom</th>
              <th className="text-center px-4 py-3 font-semibold">Latitude</th>
              <th className="text-center px-4 py-3 font-semibold">Longitude</th>
              <th className="text-center px-4 py-3 font-semibold">Moyenne</th>
            </tr></thead>
            <tbody>{students.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}>
                <td className="px-4 py-3 text-text font-medium">{s.nom}</td>
                <td className="px-4 py-3 text-text text-center">{s.latitude}</td>
                <td className="px-4 py-3 text-text text-center">{s.longitude}</td>
                <td className="px-4 py-3 text-center"><span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary/10 text-secondary">{s.moyenne.toFixed(1)}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
