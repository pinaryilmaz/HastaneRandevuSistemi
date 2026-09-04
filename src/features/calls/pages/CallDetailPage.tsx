import { ArrowLeft, ExternalLink, FileText, Phone, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { IntegrationPendingState } from '@/components/common/IntegrationPendingState';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AppointmentStatusBadge } from '@/features/appointments/components/AppointmentStatusBadge';
import { formatServiceType } from '@/features/appointments/model/appointmentMapper';
import { useMedicalAppointment } from '@/features/appointments/hooks/useMedicalAppointment';
import { formatDate } from '@/lib/formatDate';
import { maskPhone } from '@/lib/maskPhone';
import { safeExternalUrl } from '@/lib/safeExternalUrl';
import { env } from '@/lib/env';
import { CallStatusBadge } from '../components/CallStatusBadge';
import { CallTimeline } from '../components/CallTimeline';
import { useCallDetail } from '../hooks/useCallDetail';

export function CallDetailPage() {
  const { callId } = useParams();
  const callQuery = useCallDetail(callId);
  const appointmentQuery = useMedicalAppointment(callQuery.data?.appointmentId);
  const call = callQuery.data;
  const appointment = appointmentQuery.data;
  if (!env.callsApiEnabled)
    return (
      <div className="space-y-5">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-aqua-700"
        >
          <ArrowLeft size={16} /> Çağrı paneline dön
        </Link>
        <IntegrationPendingState
          title="Çağrı detayı henüz kullanılamıyor"
          description="Çağrı servisi ve detay endpoint'i API Gateway'e eklendiğinde bu ekran gerçek görüşme verilerini gösterecek."
          items={[
            'Görüşme durumu',
            'Hasta ve randevu eşleşmesi',
            'Zaman çizelgesi',
            'Güvenli transcript bağlantısı',
          ]}
        />
      </div>
    );
  if (callQuery.isLoading) return <LoadingState rows={5} />;
  if (callQuery.isError || !call)
    return <ErrorState error={callQuery.error} onRetry={() => void callQuery.refetch()} />;
  const transcript = safeExternalUrl(call.transcriptUrl);
  return (
    <div className="space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-aqua-700"
      >
        <ArrowLeft size={16} /> Çağrı paneline dön
      </Link>
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="break-all font-mono text-xs font-semibold text-aqua-700">{call.roomName}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Çağrı detayı
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Randevu ve görüşme sonuçlarının salt okunur özeti.
          </p>
        </div>
        <CallStatusBadge status={call.status} />
      </header>
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-navy-900">Hasta ve randevu</h2>
            </CardHeader>
            <CardContent>
              {appointmentQuery.isLoading ? (
                <LoadingState rows={2} />
              ) : appointment ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Detail
                    icon={UserRound}
                    label="Hasta"
                    value={appointment.customerName}
                    helper={maskPhone(appointment.customerPhone)}
                  />
                  <Detail
                    icon={Phone}
                    label="Poliklinik / hizmet"
                    value={formatServiceType(appointment.serviceType)}
                    helper={appointment.employeeName ?? 'Doktor atanmamış'}
                  />
                  <Detail
                    icon={FileText}
                    label="Randevu zamanı"
                    value={formatDate(appointment.startTime)}
                    helper={appointment.storeName}
                  />
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                      Randevu durumu
                    </p>
                    <AppointmentStatusBadge status={appointment.status} />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">Bağlı randevu bilgisi alınamadı.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-navy-900">Görüşme sonucu</h2>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Sonuç</p>
                <p className="mt-2 font-semibold text-slate-800">
                  {call.result ? resultLabels[call.result] : 'Henüz sonuçlanmadı'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Transcript
                </p>
                {transcript ? (
                  <a
                    href={transcript}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-aqua-700 hover:underline"
                  >
                    Görüşme kaydını aç <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">Transcript bağlantısı bulunmuyor.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-navy-900">Durum zaman çizelgesi</h2>
            <p className="mt-1 text-xs text-slate-500">
              Backend’in sunduğu mevcut zamanlardan üretilir.
            </p>
          </CardHeader>
          <CardContent>
            <CallTimeline call={call} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
const resultLabels = {
  CONFIRMED: 'Randevu doğrulandı',
  DECLINED: 'Hasta reddetti',
  RESCHEDULE_REQUESTED: 'Yeniden planlama istendi',
};
function Detail({
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
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
