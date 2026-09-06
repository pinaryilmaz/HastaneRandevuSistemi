import { Bot, LayoutDashboard, MessageCircle, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SystemStatus } from '@/api/contracts';
import { Card } from '@/components/ui/card';
const services = [
  { key: 'dialer', labelKey: 'dialer', helperKey: 'dialerHelp', icon: PhoneCall },
  { key: 'livekitAgent', labelKey: 'livekit', helperKey: 'livekitHelp', icon: Bot },
  {
    key: 'dashboard',
    labelKey: 'dashboard',
    helperKey: 'dashboardHelp',
    icon: LayoutDashboard,
  },
  { key: 'whatsapp', labelKey: 'whatsapp', helperKey: 'whatsappHelp', icon: MessageCircle },
] as const;
export function SystemStatusPanel({ status }: { status: SystemStatus }) {
  const { t } = useTranslation();
  return (
    <section
      aria-label={t('system.microservices')}
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {services.map(({ key, labelKey, helperKey, icon: Icon }) => {
        const up = status[key] === 'UP';
        const label = t(`system.services.${labelKey}`);
        const stateLabel = t(up ? 'system.working' : 'system.unavailable');
        return (
          <Card
            key={key}
            className="p-4"
            role="status"
            aria-label={t('system.serviceStatus', {
              service: label,
              status: stateLabel.toLowerCase(),
            })}
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
                {stateLabel}
              </span>
            </div>
            <p className="mt-4 font-semibold text-slate-900">{label}</p>
            <p className="mt-1 text-xs text-slate-500">{t(`system.services.${helperKey}`)}</p>
          </Card>
        );
      })}
    </section>
  );
}
