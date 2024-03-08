import styled from '@emotion/styled';
import { getAuth, updateProfile } from 'firebase/auth';
import useUser from '../../hooks/auth/useUser';
import { app, storage, store } from '../../remote/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { COLLECTIONS } from '../../constants';

import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../atom/user';

export default function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number;
  mode?: 'default' | 'upload';
}) {
  const user = useUser();
  const setUser = useSetRecoilState(userAtom);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const currentUser = getAuth(app).currentUser;
    // 예외처리
    if (files == null || user == null || currentUser == null) return;

    const fileName = files[0].name;
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`);

    const upload = await uploadBytes(storageRef, files[0]);
    // 파이어베이스에 업로드한 이미지를 url로 받을 수 있다.
    // await getDownloadURL(upload.ref);
    // 받은 url을 프로필의 이미지 url주소로 써서 업데이트 해줄 수 있음
    const downloadeUrl = await getDownloadURL(upload.ref);

    await updateProfile(currentUser, {
      photoURL: downloadeUrl,
    });

    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadeUrl,
    });

    setUser({
      ...user,
      photoURL: downloadeUrl,
    });
  };
  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUpload} />
      ) : null}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;
