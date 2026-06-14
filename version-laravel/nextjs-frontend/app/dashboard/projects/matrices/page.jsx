'use client';

import { useState } from 'react';

function generateMatrix(rows, cols) {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.floor(Math.random() * 10)));
}

function matrixToString(m) {
  return m.map(row => row.join(' ')).join('\n');
}

function sumMatrices(a, b) {
  if (a.length !== b.length || a[0]?.length !== b[0]?.length) return null;
  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
}

function multiplyMatrices(a, b) {
  if (a[0]?.length !== b.length) return null;
  const result = Array.from({ length: a.length }, () => Array(b[0].length).fill(0));
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < b[0].length; j++)
      for (let k = 0; k < a[0].length; k++)
        result[i][j] += a[i][k] * b[k][j];
  return result;
}

export default function MatricesPage() {
  const [m1Rows, setM1Rows] = useState(3);
  const [m1Cols, setM1Cols] = useState(3);
  const [m2Rows, setM2Rows] = useState(3);
  const [m2Cols, setM2Cols] = useState(3);
  const [mat1, setMat1] = useState([]);
  const [mat2, setMat2] = useState([]);
  const [resultSum, setResultSum] = useState('');
  const [resultProd, setResultProd] = useState('');

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Manipulation de matrices avec Javascript</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {[
          { title: 'Matrice N°1', rows: m1Rows, cols: m1Cols, setRows: setM1Rows, setCols: setM1Cols, gen: () => setMat1(generateMatrix(m1Rows, m1Cols)), matrix: mat1 },
          { title: 'Matrice N°2', rows: m2Rows, cols: m2Cols, setRows: setM2Rows, setCols: setM2Cols, gen: () => setMat2(generateMatrix(m2Rows, m2Cols)), matrix: mat2 },
        ].map(panel => (
          <div key={panel.title} className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
            <h3 className="text-base font-bold text-primary mb-4 border-b border-border pb-2">{panel.title}</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-medium text-text mb-1">Nombre de lignes :</label>
                <input type="number" min={1} max={10} value={panel.rows} onChange={e => panel.setRows(Number(e.target.value))}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" /></div>
              <div><label className="block text-sm font-medium text-text mb-1">Nombre de colonnes :</label>
                <input type="number" min={1} max={10} value={panel.cols} onChange={e => panel.setCols(Number(e.target.value))}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" /></div>
              <button onClick={panel.gen}
                className="bg-success text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Générer des valeurs aléatoires</button>
              <div><label className="block text-sm font-medium text-text mb-1">Valeurs générées :</label>
                <textarea readOnly value={panel.matrix.length > 0 ? matrixToString(panel.matrix) : ''} rows={5}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm font-mono bg-bg resize-none focus:outline-none" /></div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 space-y-6">
        <div className="flex flex-wrap gap-4">
          <button onClick={() => {
            if (!mat1.length || !mat2.length) { alert('Générez les deux matrices.'); return; }
            const r = sumMatrices(mat1, mat2);
            if (!r) { alert('Dimensions identiques requises.'); return; }
            setResultSum(matrixToString(r)); setResultProd('');
          }} className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c1121f] transition-colors">Calculer Somme</button>
          <button onClick={() => {
            if (!mat1.length || !mat2.length) { alert('Générez les deux matrices.'); return; }
            const r = multiplyMatrices(mat1, mat2);
            if (!r) { alert('Colonnes M1 doit = lignes M2.'); return; }
            setResultProd(matrixToString(r)); setResultSum('');
          }} className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6b8a] transition-colors">Calculer Produit</button>
        </div>
        {resultSum && <div><label className="block text-sm font-medium text-text mb-1">Résultat de la Somme :</label>
          <textarea readOnly value={resultSum} rows={5} className="w-full rounded-lg border border-border px-3 py-2 text-sm font-mono bg-bg resize-none" /></div>}
        {resultProd && <div><label className="block text-sm font-medium text-text mb-1">Résultat du Produit :</label>
          <textarea readOnly value={resultProd} rows={5} className="w-full rounded-lg border border-border px-3 py-2 text-sm font-mono bg-bg resize-none" /></div>}
      </div>
    </div>
  );
}
