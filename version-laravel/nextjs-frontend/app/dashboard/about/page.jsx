'use client';

import { useEffect, useState, useRef } from 'react';
import { apiRequest } from '@/lib/api';

function getMoyenneBadge(moyenne) {
  if (moyenne >= 12) return { bg: 'bg-green-100 text-green-700', label: 'Excellent' };
  if (moyenne >= 10) return { bg: 'bg-orange-100 text-orange-700', label: 'Passable' };
  return { bg: 'bg-red-100 text-red-700', label: 'Insuffisant' };
}

export default function AboutPage() {
  const [student, setStudent] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    apiRequest('/etudiants/me')
      .then(data => setStudent(data))
      .catch(err => console.error('Error fetching student:', err));
  }, []);

  // Load photo AFTER student is set
  useEffect(() => {
    if (!student?.id) return;

    apiRequest('/images')
      .then(data => {
        const profileImage = data.find(img => img.name === `profile_${student.id}`);
        if (profileImage) {
          // Use dataUrl if available, fallback to manual construction
          setPhoto(profileImage.dataUrl || `data:image/${profileImage.type};base64,${profileImage.base64}`);
        }
      })
      .catch(err => console.error('Error fetching images:', err));
  }, [student?.id]);

  useEffect(() => {
    if (student && mapRef.current && !mapInstanceRef.current) {
      import('leaflet').then(L => {
        const map = L.default.map(mapRef.current, {
          center: [student.latitude, student.longitude], zoom: 13, zoomControl: true,
        });
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);
        L.default.marker([student.latitude, student.longitude]).addTo(map)
          .bindPopup(`<b>${student.nom}</b><br/>Lat: ${student.latitude}, Lng: ${student.longitude}`);
        mapInstanceRef.current = map;
      });
    }
  }, [student]);

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file || !student) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', `profile_${student.id}`);

      const result = await apiRequest('/images', { method: 'POST', body: formData });
      if (!result || result.error) {
        throw new Error(result?.error || "Erreur lors de l'ajout de la photo.");
      }

      // Refresh images list
      const data = await apiRequest('/images');
      const profileImage = data.find(img => img.name === `profile_${student.id}`);
      if (profileImage) {
        setPhoto(profileImage.dataUrl || `data:image/${profileImage.type};base64,${profileImage.base64}`);
      }

      // Reset file input so same file can be uploaded again
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  const badge = getMoyenneBadge(student.moyenne);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0 text-center">
            <div className="w-36 h-36 rounded-full bg-bg flex items-center justify-center overflow-hidden border-4 border-secondary/20">
              {photo ? <img src={photo} alt="Photo" className="w-full h-full object-cover" /> : <span className="text-4xl text-muted">📷</span>}
            </div>
            <label className="mt-3 inline-block cursor-pointer text-sm text-secondary hover:text-primary font-medium transition-colors">
              {uploading ? 'Upload...' : photo ? 'Changer la photo' : 'Ajouter une photo'}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-1">{student.nom}</h1>
              <p className="text-muted text-sm">Login: {student.login}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-bg rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Université</h3>
                <p className="text-text font-medium">Hassan 1er, FSTS Settat</p>
              </div>
              <div className="bg-bg rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Programme</h3>
                <p className="text-text font-medium">Master RSI</p>
              </div>
              <div className="bg-bg rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Année académique</h3>
                <p className="text-text font-medium">2025–2026</p>
              </div>
              <div className="bg-bg rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Login / ID</h3>
                <p className="text-text font-medium">{student.login}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary mb-3">Résultats académiques</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-bg rounded-lg p-4 text-center"><p className="text-xs text-muted mb-1">Note 1</p><p className="text-xl font-bold text-primary">{student.note1}/20</p></div>
                <div className="bg-bg rounded-lg p-4 text-center"><p className="text-xs text-muted mb-1">Note 2</p><p className="text-xl font-bold text-primary">{student.note2}/20</p></div>
                <div className="bg-bg rounded-lg p-4 text-center">
                  <p className="text-xs text-muted mb-1">Moyenne</p>
                  <p className="text-xl font-bold text-primary">{student.moyenne.toFixed(1)}/20</p>
                  <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${badge.bg}`}>{badge.label}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary mb-3">Localisation</h2>
              <div className="bg-bg rounded-lg overflow-hidden" ref={mapRef} style={{ height: '200px' }} />
              <p className="text-xs text-muted mt-1">Latitude: {student.latitude}, Longitude: {student.longitude}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary mb-3">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Laravel'].map(skill => (
                  <span key={skill} className="bg-secondary/10 text-secondary text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
            <button onClick={() => window.print()}
              className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6b8a] transition-colors">
              🖨️ Télécharger / Imprimer CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
