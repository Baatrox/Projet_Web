import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import QuizForm from '@/components/QuizForm';
import { getQuizQuestions } from '@/lib/quizService';

export default async function Quiz1Page() {
  const session = await getSession();
  if (!session) redirect('/');

  const quizData = getQuizQuestions(1);
  if (!quizData) {
    return <div className="max-w-2xl mx-auto">Quiz not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <QuizForm 
        title={quizData.title} 
        subtitle={quizData.subtitle} 
        quizNumber={1} 
        questions={quizData.questions} 
      />
    </div>
  );
}
