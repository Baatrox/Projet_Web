'use client';

import { useState, useEffect } from 'react';
import QuizForm from '@/components/QuizForm';
import { apiRequest } from '@/lib/api';

export default function Quiz1Page() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await apiRequest('/quiz/1');
        setQuizData(data);
      } catch (e) {
        console.error('Failed to load quiz:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, []);

  if (loading) return <div className="max-w-2xl mx-auto text-center py-12"><div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto" /></div>;
  if (!quizData) return <div className="max-w-2xl mx-auto text-center py-12 text-red-500">Quiz introuvable</div>;

  return <div className="max-w-2xl mx-auto"><QuizForm title={quizData.title} subtitle={quizData.subtitle} quizNumber={1} questions={quizData.questions} /></div>;
}
