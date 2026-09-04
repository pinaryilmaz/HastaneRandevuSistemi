import { Bot, LayoutDashboard, MessageCircle, PhoneCall } from 'lucide-react';
import type { SystemStatus } from '@/api/contracts';
import { Card } from '@/components/ui/card';
const services = [
  { key: 'dialer', label: 'Arama Servisi', helper: 'Çağrı yönlendirme', icon: PhoneCall },
  { key: 'livekitAgent', label: 'Sesli AI Ajanı', helper: 'LiveKit agent', icon: Bot },
  {
    key: 'dashboard',
    label: 'Canlı Bildirim',
    helper: 'Notification servisi',
    icon: LayoutDashboard,
  },
  { key: 'whatsapp', label: 'WhatsApp', helper: 'Mesaj entegrasyonu', icon: MessageCircle },
] as const;
export function SystemStatusPanel({ status }: { status: SystemStatus }) {
  return (
    <section
      aria-label="Mikroservis durumları"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {services.map(({ key, label, helper, icon: Icon }) => {
        const up = status[key] === 'UP';
        return (
          <Card
            key={key}
            className="p-4"
            role="status"
            aria-label={`${label}: ${up ? 'çalışıyor' : 'erişilemiyor'}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="shrink-0 rounded-xl bg-slate-100 p-2.5 text-slate-600">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold ${up ? 'text-emerald-700' : 'text-rose-700'}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${up ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  aria-hidden="true"
                />
                {up ? 'Çalışıyor' : 'Erişilemiyor'}
              </span>
            </div>
            <p className="mt-4 font-semibold text-slate-900">{label}</p>
            <p className="mt-1 text-xs text-slate-500">{helper}</p>
          </Card>
        );
      })}
    </section>
  );
}
