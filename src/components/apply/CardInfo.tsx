import React, { useCallback, useState } from 'react';
import { ApplyValues } from '../../models/applyTypes';
import Button from '../shared/Button';
import FixedBottomButton from '../shared/FixedBottomButton';
import Spacing from '../shared/Spacing';

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>;

export default function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void;
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isHipass: false,
    isRf: false,
  });

  const { isHipass, isMaster, isRf } = cardInfoValues;

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const $button = e.target as HTMLButtonElement;
      // console.log('button', $button);
      // console.log('name', $button.name);
      // console.log('data', $button.dataset);
      setCardInfoValues((prev) => ({
        ...prev,
        [$button.name]: JSON.parse($button.dataset.value as string),
      }));
    },
    [],
  );

  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <FixedBottomButton
        onClick={() => {
          onNext(cardInfoValues);
        }}
        label="다음"
      ></FixedBottomButton>
    </div>
  );
}
