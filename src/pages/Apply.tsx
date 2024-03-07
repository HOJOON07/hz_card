import { useState, useEffect } from 'react';
import BasicInfo from '../components/apply/BasicInfo';
import CardInfo from '../components/apply/CardInfo';
import Terms from '../components/apply/Terms';
import Button from '../components/shared/Button';

export default function ApplyPage() {
  const [step, setStep] = useState(0);

  const handelTermsChange = (terms: string[]) => {
    console.log('terms', terms);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handelTermsChange} /> : null}
      {step === 1 ? <BasicInfo /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  );
}
