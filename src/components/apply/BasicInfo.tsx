import { useState } from 'react';
import { creditOption, payOption, yearOption } from '../../constants/apply';
import { ApplyValues } from '../../models/applyTypes';
import FixedBottomButton from '../shared/FixedBottomButton';
import Select from '../shared/Select';

type InfoValues = Pick<ApplyValues, 'salery' | 'creditScore' | 'payDate'>;

export default function BasicInfo({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void;
}) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salery: '',
    creditScore: '',
    payDate: '',
  });
  const handleInfoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const allChecked = Object.values(infoValues).every((value) => value);

  return (
    <div>
      <Select
        name="salery"
        label="연소득"
        options={yearOption}
        placeholder={yearOption[0].label}
        value={infoValues.salery}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={creditOption}
        placeholder={creditOption[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={payOption}
        placeholder={payOption[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues);
        }}
        disabled={!allChecked}
      />
    </div>
  );
}
