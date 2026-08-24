import type { Call, CallStatsPayload } from '@/api/contracts';
export function calculateCallStats(calls: Call[]): CallStatsPayload {
  const active = calls.filter((call) => call.status === 'ACTIVE');
  return { activeCalls: active.length, participants: active.reduce((sum, call) => sum + call.participantCount, 0), matched: calls.filter((call) => call.status === 'MATCHED').length };
}
const priority = { ACTIVE: 0, DIALING: 1, QUEUED: 2, MATCHED: 3, COMPLETED: 4, NO_ANSWER: 5, FAILED: 6 } as const;
export function sortCalls(calls: Call[]): Call[] { return [...calls].sort((a, b) => priority[a.status] - priority[b.status] || new Date(b.startedAt ?? 0).getTime() - new Date(a.startedAt ?? 0).getTime()); }
