import { ArrowLeft, SearchX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <SearchX size={30} />
        </span>
        <p className="mt-6 text-sm font-semibold text-aqua-700">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-navy-900">{t('notFound.title')}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">{t('notFound.description')}</p>
        <Button className="mt-6" onClick={() => history.back()}>
          <ArrowLeft size={16} /> {t('notFound.back')}
        </Button>
        <Link to="/dashboard" className="ml-3 text-sm font-semibold text-aqua-700">
          {t('notFound.dashboard')}
        </Link>
      </div>
    </main>
  );
}
