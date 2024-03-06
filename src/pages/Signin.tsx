import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Flex from '../components/shared/Flex';
import TextField from '../components/shared/TextField';
import SigninForm from '../components/signin/SigninForm';
import { useAlertContext } from '../context/AlertContext';
import { SigninFormValues } from '../models/signin';
import { auth } from '../remote/firebase';

export default function SigninPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (formValues: SigninFormValues) => {
      const { email, password } = formValues;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (err) {
        if (err instanceof FirebaseError) {
          if (err.code === 'auth/invalid-credential') {
            open({
              title: '아이디/비밀번호를 다시 확인해주세요',
              onButtonClick: () => {},
            });
            return;
          }
          open({
            title: '잠시 후 다시 시도해주세요',
            onButtonClick: () => {},
          });
        }
      }
      // const response = await signInWithEmailAndPassword(auth, email, password);

      // console.log(response);

      // console.log(formValues);
    },
    [open],
  );
  return (
    <div>
      <SigninForm onSubmit={handleSubmit} />
    </div>
  );
}
