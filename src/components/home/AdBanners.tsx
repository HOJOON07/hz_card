import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import getAdBanners from '../../remote/adBanner';
import { colors } from '../../styles/colorPalette';
import Flex from '../shared/Flex';
import Text from '../shared/Text';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from 'react-query';

export default function AdBanners() {
  const { data } = useQuery({ queryKey: ['adBanners'], queryFn: getAdBanners });
  // console.log(data);
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banners) => {
          return (
            <SwiperSlide key={banners.id}>
              <Link to={banners.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold={true}>{banners.title}</Text>
                  <Text typoghraphy="t7">{banners.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.gray};
  border-radius: 4px;
`;

const Container = styled.div`
  padding: 24px;
`;
