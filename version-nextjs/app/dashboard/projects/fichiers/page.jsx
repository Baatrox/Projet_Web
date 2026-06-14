'use client';

import { useState } from 'react';

export default function FichiersPage() {
  const [cne, setCne] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [note1, setNote1] = useState('');
  const [note2, setNote2] = useState('');
  const [note3, setNote3] = useState('');
  const [students, setStudents] = useState([]);
  const [showList, setShowList] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState('');

  async function fetchStudents() {
    const res = await fetch('/api/fichiers');
    const data = await res.json();
    setStudents(data);
    setShowList(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cne || !nom || !prenom) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const body = { cne, nom, prenom, note1: note1 || '0', note2: note2 || '0', note3: note3 || '0' };

    if (editIndex !== null) {
      await fetch('/api/fichiers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, index: editIndex }),
      });
      setMessage('Étudiant modifié avec succès !');
      setEditIndex(null);
    } else {
      await fetch('/api/fichiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setMessage('Étudiant ajouté avec succès !');
    }

    setCne(''); setNom(''); setPrenom('');
    setNote1(''); setNote2(''); setNote3('');
    fetchStudents();

    setTimeout(() => setMessage(''), 3000);
  }

  function handleEdit(s) {
    setCne(s.cne);
    setNom(s.nom);
    setPrenom(s.prenom);
    setNote1(s.note1);
    setNote2(s.note2);
    setNote3(s.note3);
    setEditIndex(s.index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Gestion de formulaire avec les fichiers</h1>

      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-lg font-bold text-primary mb-4">
          {editIndex !== null ? 'Modifier un étudiant' : 'Ajouter un étudiant'}
        </h2>

        {message && (
          <div className="bg-green-100 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Nom</label>
              <input type="text" value={nom} onChange={e => setNom(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Prénom</label>
              <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">CNE</label>
              <input type="text" value={cne} onChange={e => setCne(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" required />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Module 1 (0-20)</label>
              <input type="number" min={0} max={20} value={note1} onChange={e => setNote1(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Module 2 (0-20)</label>
              <input type="number" min={0} max={20} value={note2} onChange={e => setNote2(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Module 3 (0-20)</label>
              <input type="number" min={0} max={20} value={note3} onChange={e => setNote3(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit"
              className="bg-accent text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c1121f] transition-colors">
              Valider
            </button>
            {editIndex !== null && (
              <button type="button" onClick={() => { setEditIndex(null); setCne(''); setNom(''); setPrenom(''); setNote1(''); setNote2(''); setNote3(''); }}
                className="bg-border text-text px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity">
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="text-center">
        <button onClick={fetchStudents}
          className="text-secondary hover:text-primary font-medium text-sm underline transition-colors">
          Consulter la liste des étudiants
        </button>
      </div>

      {showList && (
        <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
          <h2 className="text-lg font-bold text-primary mb-4">Liste des étudiants enregistrés dans le fichier</h2>
          {students.length === 0 ? (
            <p className="text-muted text-sm">Aucun étudiant enregistré.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left px-4 py-3 font-semibold">CNE</th>
                    <th className="text-left px-4 py-3 font-semibold">Nom</th>
                    <th className="text-left px-4 py-3 font-semibold">Prénom</th>
                    <th className="text-center px-4 py-3 font-semibold">Module 1</th>
                    <th className="text-center px-4 py-3 font-semibold">Module 2</th>
                    <th className="text-center px-4 py-3 font-semibold">Module 3</th>
                    <th className="text-center px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}>
                      <td className="px-4 py-3 text-text">{s.cne}</td>
                      <td className="px-4 py-3 text-text">{s.nom}</td>
                      <td className="px-4 py-3 text-text">{s.prenom}</td>
                      <td className="px-4 py-3 text-text text-center">{s.note1}</td>
                      <td className="px-4 py-3 text-text text-center">{s.note2}</td>
                      <td className="px-4 py-3 text-text text-center">{s.note3}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleEdit(s)}
                          className="text-accent hover:underline text-sm font-medium">Modifier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
