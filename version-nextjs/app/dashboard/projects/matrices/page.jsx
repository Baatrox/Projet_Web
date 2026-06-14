'use client';

import { useState } from 'react';

function generateMatrix(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
  );
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
  const result = Array.from({ length: a.length }, () =>
    Array(b[0].length).fill(0)
  );
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b[0].length; j++) {
      for (let k = 0; k < a[0].length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
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

  function handleGenerate1() {
    if (m1Rows <= 0 || m1Cols <= 0) {
      alert('Dimensions invalides: nombres de lignes et colonnes doivent être > 0');
      return;
    }
    setMat1(generateMatrix(m1Rows, m1Cols));
  }

  function handleGenerate2() {
    if (m2Rows <= 0 || m2Cols <= 0) {
      alert('Dimensions invalides: nombres de lignes et colonnes doivent être > 0');
      return;
    }
    setMat2(generateMatrix(m2Rows, m2Cols));
  }

  function handleSum() {
    if (mat1.length === 0 || mat2.length === 0) {
      alert('Veuillez d\'abord générer les deux matrices.');
      return;
    }
    const result = sumMatrices(mat1, mat2);
    if (!result) {
      alert('Les dimensions des matrices doivent être identiques pour la somme.');
      return;
    }
    setResultSum(matrixToString(result));
    setResultProd('');
  }

  function handleProduct() {
    if (mat1.length === 0 || mat2.length === 0) {
      alert('Veuillez d\'abord générer les deux matrices.');
      return;
    }
    const result = multiplyMatrices(mat1, mat2);
    if (!result) {
      alert('Le nombre de colonnes de M1 doit égaler le nombre de lignes de M2 pour le produit.');
      return;
    }
    setResultProd(matrixToString(result));
    setResultSum('');
  }

  function MatrixPanel({ title, rows, cols, onRowsChange, onColsChange, onGenerate, matrix }) {
    return (
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h3 className="text-base font-bold text-primary mb-4 border-b border-border pb-2">{title}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Nombre de lignes :</label>
            <input type="number" min={1} max={10} value={rows}
              onChange={e => onRowsChange(Number(e.target.value))}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Nombre de colonnes :</label>
            <input type="number" min={1} max={10} value={cols}
              onChange={e => onColsChange(Number(e.target.value))}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:border-secondary" />
          </div>
          <button onClick={onGenerate}
            className="bg-success text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Générer des valeurs aléatoires
          </button>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Valeurs générées :</label>
            <textarea readOnly value={matrix.length > 0 ? matrixToString(matrix) : ''} rows={5}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm font-mono bg-bg resize-none focus:outline-none" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Manipulation de matrices avec Javascript</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <MatrixPanel title="Matrice N°1" rows={m1Rows} cols={m1Cols}
          onRowsChange={setM1Rows} onColsChange={setM1Cols}
          onGenerate={handleGenerate1} matrix={mat1} />
        <MatrixPanel title="Matrice N°2" rows={m2Rows} cols={m2Cols}
          onRowsChange={setM2Rows} onColsChange={setM2Cols}
          onGenerate={handleGenerate2} matrix={mat2} />
      </div>
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 space-y-6">
        <div className="flex flex-wrap gap-4">
          <button onClick={handleSum}
            className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c1121f] transition-colors">
            Calculer Somme
          </button>
          <button onClick={handleProduct}
            className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a6b8a] transition-colors">
            Calculer Produit
          </button>
        </div>
        {resultSum && (
          <div>
            <label className="block text-sm font-medium text-text mb-1">Résultat de la Somme :</label>
            <textarea readOnly value={resultSum} rows={5}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm font-mono bg-bg resize-none" />
          </div>
        )}
        {resultProd && (
          <div>
            <label className="block text-sm font-medium text-text mb-1">Résultat du Produit :</label>
            <textarea readOnly value={resultProd} rows={5}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm font-mono bg-bg resize-none" />
          </div>
        )}
      </div>
    </div>
  );
}
