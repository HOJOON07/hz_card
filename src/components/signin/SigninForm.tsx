import { css } from '@emotion/react';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { SigninFormValues } from '../../models/signin';
import { colors } from '../../styles/colorPalette';
import Button from '../shared/Button';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import TextField from '../shared/TextField';

export default function SigninForm({
  onSubmit,
}: {
  onSubmit: (formValues: SigninFormValues) => void;
}) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );
  const validate = (formValues: SigninFormValues) => {
    // errors = {email:~~, rePassword:~~, name:~~, password:~~}
    let errors: Partial<SigninFormValues> = {};
    if (validator.isEmail(formValues.email) === false) {
      errors.email = '이메일 형식을 확인해주세요';
    }
    if (formValues.password.length < 8) {
      errors.password = '비밀번호를 8글자 이상 입력해주세요';
    }

    return errors;
  };

  const errors = useMemo(() => validate(formValues), [formValues]);

  const 로그인가능한가 = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={FormContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="text@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={!로그인가능한가}
        onClick={() => {
          onSubmit(formValues);
        }}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={LinkStyles}>
        <Text typoghraphy="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  );
}

const FormContainerStyles = css`
  padding: 24px;
`;

const LinkStyles = css`
  text-align: center;
  & > span:hover {
    color: ${colors.blue};
  }
`;
