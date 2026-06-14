'use client';

import { apiRequest, clearToken } from '@/lib/api';

export default function Header({ studentName }) {

  async function handleLogout() {
    try {
      await apiRequest('/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    clearToken();
    document.cookie = 'auth-token=; path=/; max-age=0';
    window.location.href = '/';
  }

  return (
    <header className="bg-white border-b border-border shadow-sm h-16 flex-shrink-0">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">MR</div>
          <span className="font-bold text-primary text-base">Master RSI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text font-medium">{studentName}</span>
          <button onClick={handleLogout}
            className="text-sm text-accent hover:text-[#c1121f] font-medium transition-colors">
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}
