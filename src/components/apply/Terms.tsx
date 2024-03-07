import React, { useCallback, useState } from 'react';
import { TERMS_LIST } from '../../constants/apply';
import { ApplyValues } from '../../models/applyTypes';
import Agreement from '../shared/Agreement';
import FixedBottomButton from '../shared/FixedBottomButton';

export default function Terms({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void;
}) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return TERMS_LIST.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    );
  });
  const allAgreeMent = Object.values(termsAgreements).every((agree) => agree);
  const handleAllAgreement = useCallback(
    (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
      // console.log(checked);
      setTermsAgreements((prev) => {
        return Object.keys(prev).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        );
      });
    },
    [],
  );
  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allAgreeMent} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {TERMS_LIST.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prev) => ({
                ...prev,
                [id]: checked,
              }));
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!allAgreeMent}
        onClick={() => {
          onNext(Object.keys(termsAgreements));
        }}
      />
    </div>
  );
}
