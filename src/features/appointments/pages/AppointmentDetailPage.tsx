import {
  ArrowLeft,
  Building2,
  CalendarClock,
  MessageCircle,
  Stethoscope,
  UserRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { Appointment } from '@/api/contracts';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/formatDate';
import { maskPhone } from '@/lib/maskPhone';
import { AppointmentStatusBadge } from '../components/AppointmentStatusBadge';
import { useMedicalAppointment } from '../hooks/useMedicalAppointment';
import { formatServiceType } from '../model/appointmentMapper';

export function AppointmentDetailPage() {
  const { t } = useTranslation();
  const { appointmentId } = useParams();
  const location = useLocation();
  const routedAppointment = (location.state as { appointment?: Appointment } | null)?.appointment;
  const query = useMedicalAppointment(appointmentId, routedAppointment);

  if (query.isLoading) return <LoadingState rows={5} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;
  if (!query.data) {
    return (
      <div className="space-y-5">
        <Link
          to="/appointments"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-aqua-700"
        >
          <ArrowLeft size={16} /> {t('appointments.back')}
        </Link>
        <Card>
          <EmptyState
            title={t('appointments.lookupTitle')}
            description={t('appointments.lookupDescription')}
          />
        </Card>
      </div>
    );
  }

  const item = query.data;
  return (
    <div className="space-y-6">
      <Link
        to="/appointments"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-aqua-700"
      >
        <ArrowLeft size={16} /> {t('appointments.back')}
      </Link>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-aqua-700">
            {t('appointments.reference', { id: item.id.slice(0, 8) })}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            {t('appointments.detailTitle')}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{t('appointments.detailDescription')}</p>
        </div>
        <AppointmentStatusBadge status={item.status} />
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-navy-900">{t('appointments.patientInfo')}</h2>
          </CardHeader>
          <CardContent className="space-y-5">
            <InfoRow
              icon={UserRound}
              label={t('appointments.patient')}
              value={item.customerName}
              helper={maskPhone(item.customerPhone)}
            />
            <InfoRow
              icon={MessageCircle}
              label={t('appointments.communicationChannel')}
              value={t(`channel.${item.channel}`)}
              helper={t('appointments.maskedPhone')}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-navy-900">{t('appointments.scheduling')}</h2>
          </CardHeader>
          <CardContent className="space-y-5">
            <InfoRow
              icon={Stethoscope}
              label={t('appointments.clinicDoctor')}
              value={formatServiceType(item.serviceType)}
              helper={item.employeeName ?? t('common.doctorUnassigned')}
            />
            <InfoRow
              icon={CalendarClock}
              label={t('appointments.dateTime')}
              value={formatDate(item.startTime)}
              helper={t('appointments.endsAt', { date: formatDate(item.endTime) })}
            />
            <InfoRow
              icon={Building2}
              label={t('appointments.hospitalBranch')}
              value={item.storeName}
              helper={t('appointments.localTimezone')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-50 text-aqua-700">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-1 font-semibold text-slate-800">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{helper}</p>
      </div>
    </div>
  );
}
