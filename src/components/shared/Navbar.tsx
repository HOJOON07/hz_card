import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../../styles/colorPalette';
import Button from './Button';
import Flex from './Flex';

export default function Navbar() {
  const { pathname } = useLocation();
  const showSignButton = ['/signup', '/signin'].includes(pathname) === false;
  return (
    <Flex justify="space-between" css={NavBarContainerStyles} align="center">
      <Link to="/">홈</Link>
      {showSignButton && (
        <Link to="/signup">
          <Button>로그인/회원가입</Button>
        </Link>
      )}
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
