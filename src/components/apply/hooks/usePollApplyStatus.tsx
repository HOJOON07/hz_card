import { useQuery } from 'react-query';
import { APPLY_STAUTS } from '../../../models/applyTypes';

interface usePollApplyStatusProps {
  onSuccess: () => void;
  onError: () => void;
  enabled: boolean;
}

export default function usePollApplyStatus({
  onSuccess,
  onError,
  enabled,
}: usePollApplyStatusProps) {
  return useQuery(['applyStatus'], () => getApplyStatus(), {
    enabled,
    refetchInterval: 2_000,
    staleTime: 0,
    onSuccess: (status) => {
      if (status === APPLY_STAUTS.COMPLETE) {
        onSuccess();
      }
    },
    onError: () => {
      onError();
    },
  });
}

function getApplyStatus() {
  const values = [
    APPLY_STAUTS.READY,
    APPLY_STAUTS.PROGRESS,
    APPLY_STAUTS.COMPLETE,
    APPLY_STAUTS.REJECT,
  ];
  const status = values[Math.floor(Math.random() * values.length)];
  if (status === APPLY_STAUTS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.');
  }
  return status;
}
