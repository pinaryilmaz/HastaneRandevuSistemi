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
  if (!appointments.length) return <EmptyState title="Randevu bulunamadı" description="Tarih aralığını veya durum filtresini değiştirmeyi deneyin." />;
  return <><div className="hidden md:block"><TableContainer><Table><thead><tr><Th>Hasta</Th><Th>Poliklinik</Th><Th>Doktor</Th><Th>Tarih</Th><Th>Kanal</Th><Th>Durum</Th><Th><span className="sr-only">Detay</span></Th></tr></thead><tbody>{appointments.map((appointment) => <tr key={appointment.id} className="hover:bg-slate-50"><Td><p className="font-medium text-slate-900">{appointment.customerName}</p><p className="mt-0.5 font-mono text-xs text-slate-400">{maskPhone(appointment.customerPhone)}</p></Td><Td><p>{formatServiceType(appointment.serviceType)}</p><p className="mt-0.5 text-xs text-slate-400">{appointment.storeName}</p></Td><Td>{appointment.employeeName ?? 'Atanmadı'}</Td><Td className="whitespace-nowrap">{formatDate(appointment.startTime)}</Td><Td>{channelLabels[appointment.channel]}</Td><Td><AppointmentStatusBadge status={appointment.status} /></Td><Td><Link aria-label={`${appointment.customerName} randevu detayını aç`} to={`/appointments/${appointment.id}`} className="inline-flex rounded-lg p-2 text-slate-400 hover:text-aqua-700"><ChevronRight size={18} /></Link></Td></tr>)}</tbody></Table></TableContainer></div><div className="divide-y divide-slate-100 md:hidden">{appointments.map((appointment) => <Link key={appointment.id} to={`/appointments/${appointment.id}`} className="block p-4 hover:bg-slate-50"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-900">{appointment.customerName}</p><p className="mt-1 text-xs text-slate-500">{formatServiceType(appointment.serviceType)}</p></div><AppointmentStatusBadge status={appointment.status} /></div><div className="mt-4 flex justify-between gap-3 text-xs text-slate-500"><span>{appointment.employeeName ?? 'Doktor atanmamış'}</span><span>{formatDate(appointment.startTime)}</span></div></Link>)}</div></>;
}
