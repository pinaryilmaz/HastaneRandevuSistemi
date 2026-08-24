import { useQueryClient } from '@tanstack/react-query';
import type { Call } from '@/api/contracts';
import { queryKeys } from '@/api/queryKeys';
export function useRealtimeCalls() {
  const queryClient = useQueryClient();
  return (call: Call) => {
    queryClient.setQueryData(queryKeys.calls.detail(call.id), call);
    void queryClient.invalidateQueries({ queryKey: queryKeys.calls.all });
  };
}
