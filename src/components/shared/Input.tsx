import styled from '@emotion/styled';
import { colors } from '../../styles/colorPalette';

export const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`;

export default Input;
