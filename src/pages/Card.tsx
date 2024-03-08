import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import FixedBottomButton from '../components/shared/FixedBottomButton';
import Flex from '../components/shared/Flex';
import ListRow from '../components/shared/ListRow';
import Text from '../components/shared/Text';
import Top from '../components/shared/Top';
import { getCard } from '../remote/card';

import { motion } from 'framer-motion';
import { useCallback } from 'react';
import useUser from '../hooks/auth/useUser';
import { useAlertContext } from '../context/AlertContext';
import Review from '../components/card/Review';
import Spacing from '../components/shared/Spacing';

export default function CardPage() {
  const navigate = useNavigate();
  const user = useUser();
  const { open } = useAlertContext();
  const { id = '' } = useParams();
  const { data } = useQuery(['card', id], () => getCard(id), {
    // id가 빈값이 아닐때만 호출하도록
    enabled: id !== '',
  });

  const movoToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate(`/signin`);
        },
      });
      return;
    }
    navigate(`/apply/${id}`);
  }, [id, navigate, open, user]);

  return (
    <div>
      <Top
        title={`${data?.corpName} ${data?.name}`}
        subTitle={
          removeHtmlTags(data?.promotion?.title) || data?.tags.join(', ')
        }
      ></Top>
      <ul>
        {data?.benefit.map((text, index) => (
          <motion.li
            initial={{ opacity: 0, translateX: -90 }}
            // animate={{
            //   opacity: 1,
            //   translateX: 0,
            // }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 0.1],
              delay: index * 0.1,
            }}
            key={text}
          >
            <ListRow
              as="div"
              left={<IconCheck />}
              contents={
                <ListRow.Texts title={`헤택 ${index + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>
      {data?.promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typoghraphy="t7">{removeHtmlTags(data.promotion.terms)}</Text>
        </Flex>
      ) : null}
      <Spacing size={1000} />
      <Review />
      <Spacing size={100} />
      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={movoToApply}
      />
    </div>
  );
}

function removeHtmlTags(text: string | undefined) {
  // let output = '';
  // if (text)
  //   for (let i = 0; i < text.length; i++) {
  //     if (text[i] === '<') {
  //       for (let j = i + 1; j < text.length; j++) {
  //         if (text[j] === '>') {
  //           i = j;
  //           break;
  //         }
  //       }
  //     } else {
  //       output += text[i];
  //     }
  //   }
  // return output;
  if (text) return text.replace(/<\/?[^>]+(>|$)/g, '');
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`;
