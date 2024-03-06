import { css } from '@emotion/react';
import FixedBottomButton from '../shared/FixedBottomButton';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import TextField from '../shared/TextField';

export default function Form() {
  return (
    <Flex direction="column" css={FormContainerStyles}>
      <TextField label="이메일" placeholder="text@gmail.com" />
      <Spacing size={16} />
      <TextField label="패스워드" type="password" />
      <Spacing size={16} />
      <TextField label="패스워드 재확인" type="password" />
      <Spacing size={16} />
      <TextField label="이름" placeholder="홍길동" />
      <FixedBottomButton
        label="회원가입"
        onClick={() => {}}
        disabled={true}
      ></FixedBottomButton>
    </Flex>
  );
}

const FormContainerStyles = css`
  padding: 24px;
`;
