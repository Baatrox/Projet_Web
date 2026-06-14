import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import QuizForm from '@/components/QuizForm';

const questions = [
  {
    question: 'Que signifie PHP ?',
    options: [
      { label: 'a', text: 'Page Helper Process' },
      { label: 'b', text: 'Programming Home Pages' },
      { label: 'c', text: 'PHP: Hypertext Preprocessor' },
    ],
    correct: 'c',
  },
  {
    question: 'Quelle fonction retourne la longueur d\'une chaine de texte ?',
    options: [
      { label: 'a', text: 'strlen' },
      { label: 'b', text: 'strlength' },
      { label: 'c', text: 'length' },
      { label: 'd', text: 'substr' },
    ],
    correct: 'a',
  },
  {
    question: 'Sachant que $num = 6. Quelle est la valeur de : $num += 2 ?',
    options: [
      { label: 'a', text: '3' },
      { label: 'b', text: '8' },
      { label: 'c', text: '10' },
      { label: 'd', text: '12' },
    ],
    correct: 'b',
  },
];

export default async function Quiz2Page() {
  const session = await getSession();
  if (!session) redirect('/');

  return (
    <div className="max-w-2xl mx-auto">
      <QuizForm title="Quiz 2 PHP" subtitle="Tester vos Connaissances en PHP" quizNumber={2} questions={questions} />
    </div>
  );
}
