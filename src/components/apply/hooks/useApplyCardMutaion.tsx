import { useMutation } from 'react-query';
import { useAlertContext } from '../../../context/AlertContext';
import { ApplyValues } from '../../../models/applyTypes';
import { applyCard } from '../../../remote/apply';

interface useApplyCardMutaionProps {
  onSuccess: () => void;
  onError: () => void;
}

export default function useApplyCardMutaion({
  onSuccess,
  onError,
}: useApplyCardMutaionProps) {
  const { open } = useAlertContext();
  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      // console.log('카드 추가');
      onSuccess();
    },
    onError: () => {
      open({
        title: '카드를 신청하지 못했어요. 다시 시도해주세요',
        onButtonClick: () => {
          onError();
        },
      });
    },
  });
}
