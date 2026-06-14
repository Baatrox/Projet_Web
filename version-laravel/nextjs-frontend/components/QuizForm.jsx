'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';

export default function QuizForm({ title, subtitle, quizNumber, questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(qIndex, value) {
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
  }

  async function handleSubmit() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });

    const scoreOutOf20 = Math.round((correct / questions.length) * 20);
    alert(`Votre note est : ${scoreOutOf20}/20`);

    try {
      await apiRequest('/quiz/submit', {
        method: 'POST',
        body: JSON.stringify({ quiz: quizNumber, score: scoreOutOf20 }),
      });
    } catch {
      console.error('Failed to submit quiz score');
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-primary mb-2">Quiz terminé !</h2>
        <p className="text-muted">Votre note a été enregistrée.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="text-muted text-sm mt-1">{subtitle}</p>
      </div>
      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex}>
            <p className="font-semibold text-text mb-3">Q{qIndex + 1}. {q.question}</p>
            <div className="space-y-2 ml-4">
              {q.options.map(opt => (
                <label key={opt.label}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers[qIndex] === opt.label
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border hover:border-secondary/50'
                  }`}>
                  <input type="radio" name={`q_${qIndex}`} value={opt.label}
                    checked={answers[qIndex] === opt.label}
                    onChange={() => handleSelect(qIndex, opt.label)}
                    className="accent-secondary" />
                  <span className="text-sm text-text"><span className="font-medium">{opt.label}.</span> {opt.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="bg-accent text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-[#c1121f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Submit result
        </button>
        {Object.keys(answers).length < questions.length && (
          <p className="text-xs text-muted mt-2">Répondez à toutes les questions avant de soumettre.</p>
        )}
      </div>
    </div>
  );
}
