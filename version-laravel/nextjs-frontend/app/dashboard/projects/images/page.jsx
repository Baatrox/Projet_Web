'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' o';
  return (bytes / 1024).toFixed(1) + ' Ko';
}

export default function ImagesPage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  async function fetchImages() {
    const data = await apiRequest('/images');
    setImages(data);
    setShowAll(true);
  }

  async function handleUpload() {
    if (!file) { alert('Sélectionnez une image.'); return; }
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', file.name);
    try {
      await apiRequest('/images', { method: 'POST', body: formData });
      setMessage('Image insérée !'); setFile(null); fetchImages();
    } catch (err) {
      alert(err.message || 'Erreur');
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer ?')) return;
    await apiRequest(`/images/${id}`, { method: 'DELETE' });
    fetchImages();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Manipulation d'images avec les bases de données</h1>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Choix d'une image à insérer :</h2>
        {message && <div className="bg-green-100 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">{message}</div>}
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary" />
          <button onClick={handleUpload} disabled={uploading}
            className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6b8a] disabled:opacity-50">
            {uploading ? 'Insertion...' : 'Insérer Image'}
          </button>
        </div>
      </div>
      <div className="text-center">
        <button onClick={fetchImages} className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c1121f]">
          Afficher toutes les images
        </button>
      </div>
      {showAll && (
        <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
          <h2 className="text-lg font-bold text-primary mb-4">Galerie</h2>
          {images.length === 0 ? <p className="text-muted text-sm">Aucune image.</p> : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.id} className="bg-bg rounded-lg overflow-hidden">
                  <img src={img.dataUrl || `data:image/${img.type};base64,${img.base64}`} alt={img.name} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <p className="text-xs font-medium truncate">{img.name}</p>
                    <p className="text-xs text-muted">{img.type.toUpperCase()} — {formatSize(img.size)}</p>
                    <button onClick={() => handleDelete(img.id)} className="mt-2 text-xs text-accent hover:underline">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
