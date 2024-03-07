import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/auth/useUser';
import { ApplyValues, APPLY_STAUTS } from '../../models/applyTypes';
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
  const [step, setStep] = useState(0);
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  });

  const handelTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
    }));
    setStep((step) => step + 1);
  };

  const handeBasicInfoChange = (infoValues: InfoValues) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
    }));

    setStep((step) => step + 1);
  };
  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
    }));
    setStep((step) => step + 1);
  };

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STAUTS.READY,
      } as ApplyValues);
    }
  }, [applyValues, step, onSubmit]);

  return (
    <div>
      {step === 0 ? <Terms onNext={handelTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handeBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  );
}
