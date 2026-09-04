import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { LoadingState } from '@/components/common/LoadingState';
import { env } from '@/lib/env';

const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((module) => ({ default: module.LoginPage })),
);
const DashboardPage = lazy(() =>
  import('@/features/calls/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
);
const CallDetailPage = lazy(() =>
  import('@/features/calls/pages/CallDetailPage').then((module) => ({
    default: module.CallDetailPage,
  })),
);
const AppointmentsPage = lazy(() =>
  import('@/features/appointments/pages/AppointmentsPage').then((module) => ({
    default: module.AppointmentsPage,
  })),
);
const AppointmentDetailPage = lazy(() =>
  import('@/features/appointments/pages/AppointmentDetailPage').then((module) => ({
    default: module.AppointmentDetailPage,
  })),
);
const SystemPage = lazy(() =>
  import('@/features/system/pages/SystemPage').then((module) => ({ default: module.SystemPage })),
);
const page = (node: ReactNode) => (
  <Suspense fallback={<LoadingState rows={5} label="Sayfa yükleniyor" />}>{node}</Suspense>
);

export const router = createBrowserRouter([
  { path: '/login', element: page(<LoginPage />) },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to={env.defaultProtectedRoute} replace /> },
          { path: '/dashboard', element: page(<DashboardPage />) },
          { path: '/calls/:callId', element: page(<CallDetailPage />) },
          { path: '/appointments', element: page(<AppointmentsPage />) },
          { path: '/appointments/:appointmentId', element: page(<AppointmentDetailPage />) },
          { path: '/system', element: page(<SystemPage />) },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
