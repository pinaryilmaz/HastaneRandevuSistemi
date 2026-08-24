import { PhoneCall, Radio, Users } from 'lucide-react';
import type { CallStatsPayload } from '@/api/contracts';
import { StatCard } from './StatCard';
export function CallStats({ stats }: { stats: CallStatsPayload }) { return <section aria-label="Canlı çağrı özetleri" className="grid gap-4 sm:grid-cols-3"><StatCard label="Aktif çağrı" value={stats.activeCalls} description="Şu anda görüşmede" icon={PhoneCall} tone="aqua" /><StatCard label="Katılımcı" value={stats.participants} description="Aktif odalardaki toplam" icon={Users} tone="blue" /><StatCard label="Eşleşen" value={stats.matched} description="Randevuyla doğrulandı" icon={Radio} tone="violet" /></section>; }
