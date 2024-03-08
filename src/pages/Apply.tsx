import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Apply from '../components/apply';
import useAppliedCard from '../components/apply/hooks/useAppliedCard';
import useApplyCardMutaion from '../components/apply/hooks/useApplyCardMutaion';
import usePollApplyStatus from '../components/apply/hooks/usePollApplyStatus';
import FullPageLoader from '../components/shared/FullPageLoader';
import { useAlertContext } from '../context/AlertContext';
import useUser from '../hooks/auth/useUser';
import { APPLY_STAUTS } from '../models/applyTypes';
import { upDateApplyCard } from '../remote/apply';

const STAUS_MESSAGE = {
  [APPLY_STAUTS.READY]: '카드 심사를 준비하고 있습니다.',
  [APPLY_STAUTS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려주세요',
  [APPLY_STAUTS.COMPLETE]: '카드 신청이 완료되었습니다.',
};

export default function ApplyPage() {
  const navigate = useNavigate();
  const { open } = useAlertContext();

  const [readyToPoll, setReadyToPoll] = useState<boolean>(false);
  const user = useUser();
  const { id } = useParams() as { id: string };

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return;
        }
        if (applied.status === APPLY_STAUTS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back();
            },
          });
          return;
        }
        // 신청에 대한 정보는 있는데 완료는 되지 않은 케이스 -> 재심사 해야된다.
        setReadyToPoll(true);
      },
      onError: () => {},
      suspense: true,
    },
  });

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await upDateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STAUTS.COMPLETE,
        },
      });
      navigate(`/apply/done?success=true`, {
        replace: true,
      });
    },
    onError: async () => {
      await upDateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STAUTS.REJECT,
        },
      });
      navigate(`/apply/done?success=false`, {
        replace: true,
      });
    },
    enabled: readyToPoll,
  });
  const { mutate, isLoading } = useApplyCardMutaion({
    onSuccess: () => {
      setReadyToPoll(true);
    },
    onError: () => {},
  });

  if (data != null && data.status === APPLY_STAUTS.COMPLETE) {
    return null;
  }

  if (readyToPoll || isLoading) {
    return <FullPageLoader message={STAUS_MESSAGE[status ?? 'READY']} />;
  }
  return <Apply onSubmit={mutate} />;
}
