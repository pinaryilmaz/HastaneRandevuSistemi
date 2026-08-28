import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Appointment } from '@/api/contracts';
import { EmptyState } from '@/components/common/EmptyState';
import { Table, TableContainer, Td, Th } from '@/components/ui/table';
import { formatDate } from '@/lib/formatDate';
import { maskPhone } from '@/lib/maskPhone';
import { formatServiceType } from '../model/appointmentMapper';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';

const channelLabels = { WHATSAPP: 'WhatsApp', SMS: 'SMS', VOICE: 'Sesli AI' };

export function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
  if (!appointments.length) {
    return (
      <EmptyState
        title="Randevu bulunamadı"
        description="Hasta telefonunu veya diğer filtreleri kontrol etmeyi deneyin."
      />
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <TableContainer>
          <Table>
            <caption className="sr-only">
              Hasta randevuları, poliklinikler, doktorlar ve durumları
            </caption>
            <thead>
              <tr>
                <Th>Hasta</Th>
                <Th>Poliklinik</Th>
                <Th>Doktor</Th>
                <Th>Tarih</Th>
                <Th>Kanal</Th>
                <Th>Durum</Th>
                <Th>
                  <span className="sr-only">Detay</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50">
                  <Td>
                    <p className="font-medium text-slate-900">{appointment.customerName}</p>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">
                      {maskPhone(appointment.customerPhone)}
                    </p>
                  </Td>
                  <Td>
                    <p>{formatServiceType(appointment.serviceType)}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{appointment.storeName}</p>
                  </Td>
                  <Td>{appointment.employeeName ?? 'Atanmadı'}</Td>
                  <Td className="whitespace-nowrap">{formatDate(appointment.startTime)}</Td>
                  <Td>{channelLabels[appointment.channel]}</Td>
                  <Td>
                    <AppointmentStatusBadge status={appointment.status} />
                  </Td>
                  <Td>
                    <Link
                      aria-label={`${appointment.customerName} randevu detayını aç`}
                      to={`/appointments/${appointment.id}`}
                      state={{ appointment }}
                      className="inline-flex rounded-lg p-2 text-slate-400 hover:text-aqua-700"
                    >
                      <ChevronRight size={18} aria-hidden="true" />
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
      <div className="divide-y divide-slate-100 md:hidden">
        {appointments.map((appointment) => (
          <Link
            key={appointment.id}
            to={`/appointments/${appointment.id}`}
            state={{ appointment }}
            aria-label={`${appointment.customerName} randevu detayını aç`}
            className="block p-4 transition hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">{appointment.customerName}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatServiceType(appointment.serviceType)}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-400">
                  {maskPhone(appointment.customerPhone)}
                </p>
              </div>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div>
                <dt className="text-slate-400">Doktor</dt>
                <dd className="mt-0.5 font-medium text-slate-600">
                  {appointment.employeeName ?? 'Atanmamış'}
                </dd>
              </div>
              <div className="text-right">
                <dt className="text-slate-400">Tarih</dt>
                <dd className="mt-0.5 font-medium text-slate-600">
                  {formatDate(appointment.startTime)}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-slate-400">Şube</dt>
                <dd className="mt-0.5 break-words font-medium text-slate-600">
                  {appointment.storeName}
                </dd>
              </div>
              <div className="text-right">
                <dt className="text-slate-400">Kanal</dt>
                <dd className="mt-0.5 font-medium text-slate-600">
                  {channelLabels[appointment.channel]}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </>
  );
}
