'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function DashboardLayout({ children, studentName }) {
  return (
    <div className="h-screen flex flex-col">
      <Header studentName={studentName} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-bg">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
