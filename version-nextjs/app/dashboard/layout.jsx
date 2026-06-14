import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

export default async function Layout({ children }) {
  const session = await getSession();
  if (!session) redirect('/');

  return (
    <DashboardLayout studentName={session.nom}>
      {children}
    </DashboardLayout>
  );
}
