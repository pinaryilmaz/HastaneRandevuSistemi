import { ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/common/EmptyState';
import { Table, TableContainer, Td, Th } from '@/components/ui/table';
import { formatDuration } from '@/lib/formatDuration';
import { maskPhone } from '@/lib/maskPhone';
import type { CallRowModel } from '../model/callMapper';
import { CallStatusBadge } from './CallStatusBadge';

export function CallTable({ calls }: { calls: CallRowModel[] }) {
  if (!calls.length)
    return (
      <EmptyState
        title="Çağrı bulunamadı"
        description="Arama ölçütlerini veya seçili hastaneyi değiştirmeyi deneyin."
      />
    );
  return (
    <>
      <div className="hidden md:block">
        <TableContainer>
          <Table>
            <caption className="sr-only">
              Çağrı odaları, hastalar, şubeler ve görüşme durumları
            </caption>
            <thead>
              <tr>
                <Th>Oda</Th>
                <Th>Hasta</Th>
                <Th>Telefon</Th>
                <Th>Şube</Th>
                <Th>Katılımcı</Th>
                <Th>Durum</Th>
                <Th>Süre</Th>
                <Th>
                  <span className="sr-only">Detay</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => (
                <tr key={call.id} className="group transition hover:bg-slate-50">
                  <Td>
                    <span className="font-mono text-xs font-semibold text-navy-700">
                      {call.roomName}
                    </span>
                  </Td>
                  <Td>
                    <p className="font-medium text-slate-900">{call.customerName}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{call.serviceType}</p>
                  </Td>
                  <Td className="font-mono text-xs">{maskPhone(call.customerPhone)}</Td>
                  <Td>{call.storeName}</Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} className="text-slate-400" aria-hidden="true" />
                      {call.participantCount}
                    </span>
                  </Td>
                  <Td>
                    <CallStatusBadge status={call.status} />
                  </Td>
                  <Td className="font-mono text-xs font-semibold">
                    {formatDuration(call.startedAt, call.endedAt)}
                  </Td>
                  <Td>
                    <Link
                      to={`/calls/${call.id}`}
                      aria-label={`${call.customerName} çağrı detayını aç`}
                      className="inline-flex rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-aqua-700"
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
      <div className="divide-y divide-slate-100 md:hidden" aria-label="Çağrı listesi">
        {calls.map((call) => (
          <Link
            key={call.id}
            to={`/calls/${call.id}`}
            aria-label={`${call.customerName} çağrı detayını aç`}
            className="block p-4 transition hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">{call.customerName}</p>
                <p className="mt-1 break-all font-mono text-xs text-slate-500">
                  {maskPhone(call.customerPhone)} · {call.roomName}
                </p>
              </div>
              <CallStatusBadge status={call.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div className="min-w-0">
                <dt className="text-slate-400">Şube</dt>
                <dd className="mt-0.5 break-words font-medium text-slate-600">{call.storeName}</dd>
              </div>
              <div className="text-right">
                <dt className="text-slate-400">Görüşme</dt>
                <dd className="mt-0.5 font-medium text-slate-600">
                  {call.participantCount} katılımcı · {formatDuration(call.startedAt, call.endedAt)}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </>
  );
}
