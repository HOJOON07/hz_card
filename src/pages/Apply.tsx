import { useState, useEffect } from 'react';
import BasicInfo from '../components/apply/BasicInfo';
import CardInfo from '../components/apply/CardInfo';
import Terms from '../components/apply/Terms';

import { ApplyValues } from '../models/applyTypes';

type InfoValues = Pick<ApplyValues, 'salery' | 'creditScore' | 'payDate'>;

export default function ApplyPage() {
  const [step, setStep] = useState(1);

  const handelTermsChange = (terms: ApplyValues['terms']) => {
    console.log('terms', terms);
  };

  const handeBasicInfoChange = (infoValues: InfoValues) => {
    console.log(infoValues);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handelTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handeBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  );
}
