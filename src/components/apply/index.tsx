import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/auth/useUser';
import { ApplyValues, APPLY_STAUTS } from '../../models/applyTypes';
import ProgressBar from '../shared/ProgressBar';
import BasicInfo from './BasicInfo';
import CardInfo from './CardInfo';
import Terms from './Terms';

type InfoValues = Pick<ApplyValues, 'salery' | 'creditScore' | 'payDate'>;
type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>;

export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void;
}) {
  const user = useUser();
  const { id } = useParams() as { id: string };

  const storageKey = `applied-${user?.uid}-${id}`;
  // const [step, setStep] = useState(0);

  // 게으른 초기화
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey);

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      };
    }
    return JSON.parse(applied);
  });

  const handelTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }));
  };

  const handeBasicInfoChange = (infoValues: InfoValues) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }));
  };
  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
      step: (prev.step as number) + 1,
    }));
  };

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey);
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STAUTS.READY,
      } as ApplyValues);
    } else {
      // console.log(applyValues);
      localStorage.setItem(storageKey, JSON.stringify(applyValues));
    }
  }, [applyValues, onSubmit, storageKey]);

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / 3} />
      {applyValues.step === 0 ? <Terms onNext={handelTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handeBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  );
}
