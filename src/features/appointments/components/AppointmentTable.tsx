import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Appointment } from '@/api/contracts';
import { EmptyState } from '@/components/common/EmptyState';
import { Table, TableContainer, Td, Th } from '@/components/ui/table';
import { formatDate } from '@/lib/formatDate';
import { maskPhone } from '@/lib/maskPhone';
import { formatServiceType } from '../model/appointmentMapper';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';

export function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
  const { t } = useTranslation();
  if (!appointments.length) {
    return (
      <EmptyState
        title={t('appointments.emptyTitle')}
        description={t('appointments.emptyDescription')}
      />
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <TableContainer>
          <Table>
            <caption className="sr-only">{t('appointments.tableCaption')}</caption>
            <thead>
              <tr>
                <Th>{t('appointments.patient')}</Th>
                <Th>{t('appointments.clinic')}</Th>
                <Th>{t('appointments.doctor')}</Th>
                <Th>{t('appointments.date')}</Th>
                <Th>{t('appointments.channel')}</Th>
                <Th>{t('calls.status')}</Th>
                <Th>
                  <span className="sr-only">{t('common.details')}</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50">
                  <Td>
                    <p className="font-medium text-slate-900">{appointment.customerName}</p>
                    <p className="mt-0.5 font-mono text-xs text-slate-500">
                      {maskPhone(appointment.customerPhone)}
                    </p>
                  </Td>
                  <Td>
                    <p>{formatServiceType(appointment.serviceType)}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{appointment.storeName}</p>
                  </Td>
                  <Td>{appointment.employeeName ?? t('common.unassigned')}</Td>
                  <Td className="whitespace-nowrap">{formatDate(appointment.startTime)}</Td>
                  <Td>{t(`channel.${appointment.channel}`)}</Td>
                  <Td>
                    <AppointmentStatusBadge status={appointment.status} />
                  </Td>
                  <Td>
                    <Link
                      aria-label={t('appointments.openDetails', { name: appointment.customerName })}
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
            aria-label={t('appointments.openDetails', { name: appointment.customerName })}
            className="block p-4 transition hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">{appointment.customerName}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatServiceType(appointment.serviceType)}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  {maskPhone(appointment.customerPhone)}
                </p>
              </div>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div>
                <dt className="text-slate-500">{t('appointments.doctor')}</dt>
                <dd className="mt-0.5 font-medium text-slate-600">
                  {appointment.employeeName ?? t('common.unassigned')}
                </dd>
              </div>
              <div className="text-right">
                <dt className="text-slate-500">{t('appointments.date')}</dt>
                <dd className="mt-0.5 font-medium text-slate-600">
                  {formatDate(appointment.startTime)}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-slate-500">{t('appointments.branch')}</dt>
                <dd className="mt-0.5 break-words font-medium text-slate-600">
                  {appointment.storeName}
                </dd>
              </div>
              <div className="text-right">
                <dt className="text-slate-500">{t('appointments.channel')}</dt>
                <dd className="mt-0.5 font-medium text-slate-600">
                  {t(`channel.${appointment.channel}`)}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </>
  );
}
