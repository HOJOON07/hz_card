import { css } from '@emotion/react';
import React, { useCallback, useMemo, useState } from 'react';
import { SignupFormValues } from '../../models/signup';
import FixedBottomButton from '../shared/FixedBottomButton';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import TextField from '../shared/TextField';
import validator from 'validator';

export default function SignupForm({
  onSubmit,
}: {
  onSubmit: (formValues: SignupFormValues) => void;
}) {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  });

  const [dirty, setDirty] = useState<Partial<SignupFormValues>>({});

  const handleBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = e;
    setDirty((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const validate = (formValues: SignupFormValues) => {
    // errors = {email:~~, rePassword:~~, name:~~, password:~~}
    let errors: Partial<SignupFormValues> = {};
    if (validator.isEmail(formValues.email) === false) {
      errors.email = '이메일 형식을 확인해주세요';
    }
    if (formValues.password.length < 8) {
      errors.password = '비밀번호를 8글자 이상 입력해주세요';
    }
    if (formValues.rePassword.length < 8) {
      errors.rePassword = '비밀번호를 8글자 이상 입력해주세요';
    } else if (
      validator.equals(formValues.rePassword, formValues.password) === false
    ) {
      errors.rePassword = '비밀번호를 확인해주세요';
    }
    if (formValues.name.length < 2) {
      errors.name = '이름은 2글자 이상 입력해주세요';
    }
    return errors;
  };

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;

      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );
  const errors = useMemo(() => validate(formValues), [formValues]);

  const 제출가능한상태인가 = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={FormContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="text@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) && errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) && errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) && errors.rePassword}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="홍길동"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) && errors.name}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        label="회원가입"
        onClick={() => {
          onSubmit(formValues);
        }}
        disabled={!제출가능한상태인가}
      ></FixedBottomButton>
    </Flex>
  );
}

const FormContainerStyles = css`
  padding: 24px;
`;
