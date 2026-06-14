'use client';

import { useState } from 'react';

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
  const [messageType, setMessageType] = useState('success');

  async function fetchImages() {
    const res = await fetch('/api/images');
    const data = await res.json();
    setImages(data);
    setShowAll(true);
  }

  async function handleUpload() {
    if (!file) {
      setMessage('Veuillez sélectionner une image.');
      setMessageType('error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', file.name);

    try {
      const res = await fetch('/api/images', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setMessage('Image insérée avec succès !');
        setMessageType('success');
        setFile(null);
        fetchImages();
      } else {
        setMessage(data.error || 'Erreur lors de l\'insertion de l\'image.');
        setMessageType('error');
      }
    } catch {
      setMessage('Erreur serveur');
      setMessageType('error');
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cette image ?')) return;
    await fetch(`/api/images/${id}`, { method: 'DELETE' });
    fetchImages();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Manipulation d'images avec les bases de donn&#233;es</h1>

      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Choix d'une image &#224; ins&#233;rer :</h2>

        {message && (
          <div className={`rounded-lg px-4 py-3 mb-4 text-sm ${
            messageType === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}>{message}</div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1">
            <input type="file" accept="image/*"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-text file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20" />
          </div>
          <button onClick={handleUpload} disabled={uploading}
            className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6b8a] transition-colors disabled:opacity-50">
            {uploading ? 'Insertion...' : 'Insérer Image'}
          </button>
        </div>
      </div>

      <div className="text-center">
        <button onClick={fetchImages}
          className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c1121f] transition-colors">
          Afficher toutes les images
        </button>
      </div>

      {showAll && (
        <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
          <h2 className="text-lg font-bold text-primary mb-4">Galerie d'images</h2>
          {images.length === 0 ? (
            <p className="text-muted text-sm">Aucune image dans la base de donn&#233;es.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.id} className="bg-bg rounded-lg overflow-hidden">
                  <img src={img.dataUrl || `data:image/${img.type};base64,${img.base64}`} alt={img.name}
                    className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <p className="text-xs font-medium text-text truncate">{img.name}</p>
                    <p className="text-xs text-muted">{img.type.toUpperCase()} &#8212; {formatSize(img.size)}</p>
                    <button onClick={() => handleDelete(img.id)}
                      className="mt-2 text-xs text-accent hover:underline">Supprimer</button>
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
