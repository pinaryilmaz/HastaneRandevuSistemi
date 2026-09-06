import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
export function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('common.pageTitle');
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t('common.pageDescription'));
  }, [i18n.resolvedLanguage, t]);

  return <RouterProvider router={router} />;
}
