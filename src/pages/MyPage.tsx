import { signOut } from 'firebase/auth';
import { useCallback } from 'react';
import MyImage from '../components/my/MyImage';
import Button from '../components/shared/Button';
import Flex from '../components/shared/Flex';
import Spacing from '../components/shared/Spacing';
import Text from '../components/shared/Text';
import useUser from '../hooks/auth/useUser';
import { auth } from '../remote/firebase';

export default function MyPage() {
  const user = useUser();
  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage mode="upload" />
      <Spacing size={20} />
      <Text>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  );
}
