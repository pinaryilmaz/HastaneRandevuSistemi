import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { useRealtimeStream } from '@/features/system/hooks/useRealtimeStream';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell() {
  const { t } = useTranslation();
  const [menu, setMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const openMenu = useCallback(() => setMenu(true), []);
  const closeMenu = useCallback(() => setMenu(false), []);
  useRealtimeStream();

  return (
    <div className="min-h-screen bg-slate-50">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
      >
        {t('navigation.skipToContent')}
      </a>
      <Sidebar open={menu} onClose={closeMenu} />
      <div className="lg:pl-72">
        <Header menuButtonRef={menuButtonRef} onMenu={openMenu} />
        <main id="main-content" tabIndex={-1} className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
