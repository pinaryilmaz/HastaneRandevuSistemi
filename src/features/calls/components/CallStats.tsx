import { PhoneCall, Radio, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CallStatsPayload } from '@/api/contracts';
import { StatCard } from './StatCard';
export function CallStats({ stats }: { stats: CallStatsPayload }) {
  const { t } = useTranslation();
  return (
    <section aria-label={t('calls.summaries')} className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label={t('calls.active')}
        value={stats.activeCalls}
        description={t('calls.activeDescription')}
        icon={PhoneCall}
        tone="aqua"
      />
      <StatCard
        label={t('calls.participants')}
        value={stats.participants}
        description={t('calls.participantsDescription')}
        icon={Users}
        tone="blue"
      />
      <StatCard
        label={t('calls.matched')}
        value={stats.matched}
        description={t('calls.matchedDescription')}
        icon={Radio}
        tone="violet"
      />
    </section>
  );
}
