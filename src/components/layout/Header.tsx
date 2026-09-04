import type { RefObject } from 'react';
import { LogOut, Menu, ShieldCheck, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ConnectionBadge } from '@/features/system/components/ConnectionBadge';
export function Header({
  onMenu,
  menuButtonRef,
}: {
  onMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement>;
}) {
  const user = useAuthStore((state) => state.user);
  const clear = useAuthStore((state) => state.clearSession);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/90 px-3 backdrop-blur sm:min-h-20 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-1 sm:gap-3">
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="sm"
          className="shrink-0 px-2 lg:hidden"
          onClick={onMenu}
          aria-label="Ana menüyü aç"
          aria-haspopup="dialog"
        >
          <Menu size={21} aria-hidden="true" />
        </Button>
        <ConnectionBadge />
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 md:inline-flex">
          <ShieldCheck size={13} aria-hidden="true" /> Yetkili oturum
        </span>
        <div className="hidden text-right sm:block">
          <p className="max-w-40 truncate text-sm font-semibold text-slate-800">{user?.name}</p>
          <p className="text-xs text-slate-500">Operasyon kullanıcısı</p>
        </div>
        <span
          className="hidden h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white sm:flex"
          aria-hidden="true"
        >
          <UserRound size={18} />
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 px-2"
          aria-label="Oturumu kapat"
          onClick={() => {
            clear();
            navigate('/login', { replace: true });
          }}
        >
          <LogOut size={18} aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
