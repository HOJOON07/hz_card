import Form from '../components/signup/Form';
import { FormValues } from '../models/signup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, store } from '../remote/firebase';
import { COLLECTIONS } from '../constants';

export default function SignupPage() {
  // signupPage는 form값들이 궁금하지 않다. 완성된 데이터만 필요할 뿐 -> 관심사를 분리한다.
  const handleSubmit = async (formValues: FormValues) => {
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

    console.log(user);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}
