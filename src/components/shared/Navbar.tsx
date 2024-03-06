import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../../styles/colorPalette';
import Button from './Button';
import Flex from './Flex';
import useUser from '../../hooks/auth/useUser';
import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../remote/firebase';

export default function Navbar() {
  const { pathname } = useLocation();
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false;

  const user = useUser();

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>;
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }
    return null;
  }, [showSignButton, user, handleLogout]);

  return (
    <Flex justify="space-between" css={NavBarContainerStyles} align="center">
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  );
}

const NavBarContainerStyles = css`
  position: sticky;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
  top: 0;
  padding: 10px 24px;
`;
