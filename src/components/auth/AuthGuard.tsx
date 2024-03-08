import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../remote/firebase';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../atom/user';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState<Boolean>(false);
  const setUser = useSetRecoilState(userAtom);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.phoneNumber ?? '',
      });
    } else {
      setUser(null);
    }
    setInitialize(true);
  });

  if (initialize === false) {
    return <div>인증 처리중.. 로딩 중 ....</div>;
  }

  // if (인증처리가안됨) {
  //   return null;
  // }

  return <React.Fragment>{children}</React.Fragment>;
}
