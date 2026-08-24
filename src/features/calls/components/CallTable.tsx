import { ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/common/EmptyState';
import { Table, TableContainer, Td, Th } from '@/components/ui/table';
import { formatDuration } from '@/lib/formatDuration';
import { maskPhone } from '@/lib/maskPhone';
import type { CallRowModel } from '../model/callMapper';
import { CallStatusBadge } from './CallStatusBadge';

export function CallTable({ calls }: { calls: CallRowModel[] }) {
  if (!calls.length) return <EmptyState title="Çağrı bulunamadı" description="Arama ölçütlerini veya seçili hastaneyi değiştirmeyi deneyin." />;
  return <><div className="hidden md:block"><TableContainer><Table><thead><tr><Th>Oda</Th><Th>Hasta</Th><Th>Telefon</Th><Th>Şube</Th><Th>Katılımcı</Th><Th>Durum</Th><Th>Süre</Th><Th><span className="sr-only">Detay</span></Th></tr></thead><tbody>{calls.map((call) => <tr key={call.id} className="group transition hover:bg-slate-50"><Td><span className="font-mono text-xs font-semibold text-navy-700">{call.roomName}</span></Td><Td><p className="font-medium text-slate-900">{call.customerName}</p><p className="mt-0.5 text-xs text-slate-400">{call.serviceType}</p></Td><Td className="font-mono text-xs">{maskPhone(call.customerPhone)}</Td><Td>{call.storeName}</Td><Td><span className="inline-flex items-center gap-1.5"><Users size={14} className="text-slate-400" />{call.participantCount}</span></Td><Td><CallStatusBadge status={call.status} /></Td><Td className="font-mono text-xs font-semibold">{formatDuration(call.startedAt, call.endedAt)}</Td><Td><Link to={`/calls/${call.id}`} aria-label={`${call.customerName} çağrı detayını aç`} className="inline-flex rounded-lg p-2 text-slate-400 hover:bg-white hover:text-aqua-700"><ChevronRight size={18} /></Link></Td></tr>)}</tbody></Table></TableContainer></div><div className="divide-y divide-slate-100 md:hidden">{calls.map((call) => <Link key={call.id} to={`/calls/${call.id}`} className="block p-4 transition hover:bg-slate-50"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-900">{call.customerName}</p><p className="mt-1 font-mono text-xs text-slate-500">{maskPhone(call.customerPhone)} · {call.roomName}</p></div><CallStatusBadge status={call.status} /></div><div className="mt-4 flex items-center justify-between text-xs text-slate-500"><span>{call.storeName}</span><span>{call.participantCount} katılımcı · {formatDuration(call.startedAt, call.endedAt)}</span></div></Link>)}</div></>;
}
