import SignupForm from '../components/signup/SignupForm';
import { SignupFormValues } from '../models/signup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, store } from '../remote/firebase';
import { COLLECTIONS } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const naviage = useNavigate();
  // signupPage는 form값들이 궁금하지 않다. 완성된 데이터만 필요할 뿐 -> 관심사를 분리한다.
  const handleSubmit = async (formValues: SignupFormValues) => {
    const { email, password, name } = formValues;
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(user, {
      displayName: name,
    });

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    };

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser);

    naviage('/');
  };
  return (
    <div>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
}
