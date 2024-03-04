import { CSSProperties } from 'react';

import styled from '@emotion/styled';
import { Typography, typographyMap } from '../../styles/typoGraphy';
import { colors, Colors } from '../../styles/colorPalette';

interface TextProps {
  typoghraphy?: Typography;
  color?: Colors;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color], // var(--red)
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    display,
  }),
  ({ typoghraphy = 't5' }) => typographyMap[typoghraphy],
);

export default Text;
