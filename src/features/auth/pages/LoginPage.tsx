import { Activity, CheckCircle2, HeartPulse, Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { env } from '@/lib/env';
import { LoginForm } from '../components/LoginForm';
import { useAuthStore } from '../store/authStore';

export function LoginPage() {
  const { t } = useTranslation();
  const authenticated = useAuthStore((state) => state.isAuthenticated());
  if (authenticated) return <Navigate to={env.defaultProtectedRoute} replace />;
  return (
    <main className="relative min-h-screen bg-navy-900 lg:grid lg:grid-cols-[1.08fr_0.92fr]">
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <LanguageSelector compact />
      </div>
      <section className="relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-aqua-500/20 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <HeartPulse />
          </div>
          <div>
            <p className="font-semibold">{t('login.productName')}</p>
            <p className="text-xs text-slate-300">{t('login.productDescription')}</p>
          </div>
        </div>
        <div className="relative max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-aqua-100">
            {t('login.tower')}
          </p>
          <h1 className="text-5xl font-semibold leading-tight">{t('login.hero')}</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            {t('login.heroDescription')}
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              [Activity, t('login.metric')],
              [Radio, t('login.events')],
              [CheckCircle2, t('login.tracing')],
            ].map(([Icon, text]) => {
              const ItemIcon = Icon as typeof Activity;
              return (
                <div key={String(text)} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <ItemIcon className="mb-3 text-aqua-100" size={20} />
                  <p className="text-sm">{String(text)}</p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="relative text-xs text-slate-400">{t('login.privacy')}</p>
      </section>
      <section className="flex min-h-screen min-w-0 items-center justify-center overflow-x-hidden bg-slate-50 px-4 py-8 sm:px-5 sm:py-10">
        <div className="w-[calc(100vw-2rem)] min-w-0 max-w-md sm:w-full">
          <div className="mb-8 lg:hidden">
            <HeartPulse className="text-aqua-600" />
            <p className="mt-2 font-semibold text-navy-900">{t('login.productName')}</p>
          </div>
          <div className="min-h-[32rem] min-w-0 max-w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-panel sm:p-9">
            <p className="text-sm font-semibold text-aqua-700">{t('login.panel')}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
              {t('login.welcome')}
            </h2>
            <p className="mb-8 mt-2 text-sm leading-6 text-slate-500">{t('login.continue')}</p>
            <LoginForm />
            <div className="mt-6 min-h-[4.25rem] break-words rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              <strong>{env.useMockAuth ? t('login.demo') : t('login.localBackend')}:</strong>{' '}
              {t('login.sampleAccount')}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
