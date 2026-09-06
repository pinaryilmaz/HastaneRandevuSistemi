import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { CalendarDays, HeartPulse, LayoutDashboard, ServerCog, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
const links = [
  { to: '/dashboard', labelKey: 'navigation.calls', icon: LayoutDashboard },
  { to: '/appointments', labelKey: 'navigation.appointments', icon: CalendarDays },
  { to: '/system', labelKey: 'navigation.system', icon: ServerCog },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  const keepFocusInside = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-30 bg-navy-900/50 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      />
      <aside
        ref={panelRef}
        role={open ? 'dialog' : undefined}
        aria-label={t('navigation.appMenu')}
        aria-modal={open || undefined}
        onKeyDown={keepFocusInside}
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[min(18rem,calc(100vw-2rem))] flex-col bg-navy-900 px-4 py-5 text-white shadow-2xl transition-transform lg:visible lg:w-72 lg:translate-x-0 lg:shadow-none',
          open ? 'visible translate-x-0' : 'invisible -translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 rounded-xl bg-aqua-500/20 p-2.5 text-aqua-100 ring-1 ring-aqua-100/20">
              <HeartPulse size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">{t('common.appName')}</p>
              <p className="text-[11px] text-slate-400">{t('common.appSubtitle')}</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onClose}
            aria-label={t('navigation.closeMenu')}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={t('navigation.menu')} className="mt-10 space-y-1">
          {links.map(({ to, labelKey, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white',
                )
              }
            >
              <Icon size={18} aria-hidden="true" />
              {t(labelKey)}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-aqua-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {t('sidebar.secureView')}
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-400">{t('sidebar.secureDescription')}</p>
        </div>
      </aside>
    </>
  );
}
