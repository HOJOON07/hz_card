import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Apply from '../components/apply';
import useApplyCardMutaion from '../components/apply/hooks/useApplyCardMutaion';
import usePollApplyStatus from '../components/apply/hooks/usePollApplyStatus';
import useUser from '../hooks/auth/useUser';
import { APPLY_STAUTS } from '../models/applyTypes';
import { upDateApplyCard } from '../remote/apply';

export default function ApplyPage() {
  const navigate = useNavigate();

  const [readyToPoll, setReadyToPoll] = useState<boolean>(false);
  const user = useUser();
  const { id } = useParams() as { id: string };

  usePollApplyStatus({
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

  if (readyToPoll || isLoading) {
    return <div>Loading...</div>;
  }
  return <Apply onSubmit={mutate} />;
}
