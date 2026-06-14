import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import QuizForm from '@/components/QuizForm';

const questions = [
  {
    question: 'Dans quel élément on met le code javascript ?',
    options: [
      { label: 'a', text: '<script>' },
      { label: 'b', text: '<js>' },
      { label: 'c', text: '<body>' },
      { label: 'd', text: '<link>' },
    ],
    correct: 'a',
  },
  {
    question: 'Quel attribut utiliser pour faire référence à un script javascript externe ?',
    options: [
      { label: 'a', text: 'src' },
      { label: 'b', text: 'rel' },
      { label: 'c', text: 'type' },
      { label: 'd', text: 'href' },
    ],
    correct: 'a',
  },
  {
    question: 'Comment afficher "hello" sur un message alert ?',
    options: [
      { label: 'a', text: 'msg("hello")' },
      { label: 'b', text: 'alertbox("hello")' },
      { label: 'c', text: 'documentwrite("hello")' },
      { label: 'd', text: 'alert("hello")' },
    ],
    correct: 'd',
  },
];

export default async function Quiz1Page() {
  const session = await getSession();
  if (!session) redirect('/');

  return (
    <div className="max-w-2xl mx-auto">
      <QuizForm title="Quiz 1 Javascript" subtitle="Tester vos Connaissances en javascript" quizNumber={1} questions={questions} />
    </div>
  );
}
