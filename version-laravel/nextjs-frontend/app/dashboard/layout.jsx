'use client';

import { useEffect, useState } from 'react';
import { getToken, apiRequest } from '@/lib/api';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function Layout({ children }) {
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/';
      return;
    }

    apiRequest('/etudiants/me')
      .then(data => {
        setStudentName(data.nom);
        setLoading(false);
      })
      .catch(() => {
        window.location.href = '/';
      });
  }, []);

  useEffect(() => {
    const onPageShow = (e) => {
      if (e.persisted) {
        if (!getToken()) {
          window.location.href = '/';
        }
      }
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin w-10 h-10 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

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
