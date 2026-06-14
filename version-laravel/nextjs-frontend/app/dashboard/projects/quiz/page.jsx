'use client';

import Link from 'next/link';

export default function QuizPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Quiz</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <Link href="/dashboard/projects/quiz/quiz1" className="group">
          <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 text-center hover:shadow-lg">
            <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"><span className="text-4xl">🌐</span></div>
            <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary">Quizz N°1</h2>
            <p className="text-muted text-sm">JavaScript — Testez vos connaissances</p>
          </div>
        </Link>
        <Link href="/dashboard/projects/quiz/quiz2" className="group">
          <div className="bg-surface rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-8 text-center hover:shadow-lg">
            <div className="w-24 h-24 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4"><span className="text-4xl">🗄️</span></div>
            <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary">Quizz N°2</h2>
            <p className="text-muted text-sm">PHP — Testez vos connaissances</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
