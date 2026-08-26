import {
  ArrowLeft,
  Building2,
  CalendarClock,
  MessageCircle,
  Stethoscope,
  UserRound,
} from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { Appointment } from '@/api/contracts';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { env } from '@/lib/env';
import { formatDate } from '@/lib/formatDate';
import { maskPhone } from '@/lib/maskPhone';
import { useFilterStore } from '@/store/filterStore';
import { AppointmentStatusBadge } from '../components/AppointmentStatusBadge';
import { useMedicalAppointment } from '../hooks/useMedicalAppointment';
import { formatServiceType } from '../model/appointmentMapper';

export function AppointmentDetailPage() {
  const { appointmentId } = useParams();
  const location = useLocation();
  const routedAppointment = (location.state as { appointment?: Appointment } | null)?.appointment;
  const storedPhone = useFilterStore((state) => state.appointmentPatientPhone);
  const patientPhone = routedAppointment?.customerPhone || storedPhone || undefined;
  const query = useMedicalAppointment(appointmentId, patientPhone, routedAppointment);

  if (query.isLoading) return <LoadingState rows={5} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;
  if (!query.data) {
    return (
      <div className="space-y-5">
        <Link
          to="/appointments"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-aqua-700"
        >
          <ArrowLeft size={16} /> Randevulara dön
        </Link>
        <Card>
          <EmptyState
            title="Randevu bilgisi yeniden aranmalı"
            description={
              env.useMocks
                ? 'Randevu kaydı bulunamadı.'
                : 'Backend henüz randevuyu ID ile getirmiyor. Liste ekranında hasta telefonuyla arayıp randevuyu yeniden açın.'
            }
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
        <ArrowLeft size={16} /> Randevulara dön
      </Link>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-aqua-700">
            Randevu #{item.id.slice(0, 8)}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy-900">
            Randevu detayı
          </h1>
          <p className="mt-2 text-sm text-slate-500">Hasta ve planlama bilgileri · salt okunur</p>
        </div>
        <AppointmentStatusBadge status={item.status} />
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader><h2 className="font-semibold text-navy-900">Hasta bilgileri</h2></CardHeader>
          <CardContent className="space-y-5">
            <InfoRow icon={UserRound} label="Hasta" value={item.customerName} helper={maskPhone(item.customerPhone)} />
            <InfoRow
              icon={MessageCircle}
              label="İletişim kanalı"
              value={{ WHATSAPP: 'WhatsApp', SMS: 'SMS', VOICE: 'Sesli AI' }[item.channel]}
              helper="Telefon bilgisi maskelenmiştir"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="font-semibold text-navy-900">Planlama</h2></CardHeader>
          <CardContent className="space-y-5">
            <InfoRow
              icon={Stethoscope}
              label="Poliklinik / doktor"
              value={formatServiceType(item.serviceType)}
              helper={item.employeeName ?? 'Doktor atanmamış'}
            />
            <InfoRow
              icon={CalendarClock}
              label="Tarih ve saat"
              value={formatDate(item.startTime)}
              helper={`Bitiş: ${formatDate(item.endTime)}`}
            />
            <InfoRow icon={Building2} label="Hastane / şube" value={item.storeName} helper="Yerel hastane saat dilimi" />
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
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-1 font-semibold text-slate-800">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{helper}</p>
      </div>
    </div>
  );
}
