import { css } from '@emotion/react';
import React from 'react';
import IconArrowRight from '../../icons/IconArrowRight';
import Flex from './Flex';
import Skeleton from './Skeleton';
import Spacing from './Spacing';
import Text from './Text';

const listRowContainerStyles = css`
  padding: 8px 24px;
  align-items: center;
`;

const listRowLeftStyles = css`
  margin-right: 14px;
`;

const listRowContentsStyles = css`
  flex: 1;
`;

interface ListRowProps {
  left?: React.ReactNode;
  contents: React.ReactNode;
  right?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
  as?: 'div' | 'li';
}

export default function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = 'li',
}: ListRowProps) {
  return (
    <Flex as={as} css={listRowContainerStyles} onClick={onClick}>
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  );
}

function ListRowSkeleton() {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  );
}

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode;
  subTitle: React.ReactNode;
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typoghraphy="t7">{subTitle}</Text>
    </Flex>
  );
}

ListRow.Texts = ListRowTexts;
ListRow.Skeleton = ListRowSkeleton;
