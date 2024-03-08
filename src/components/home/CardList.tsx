import { css } from '@emotion/react';
import flatten from 'lodash.flatten';
import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { getCards } from '../../remote/card';
import Badge from '../shared/Badge';
import ListRow from '../shared/ListRow';

export default function CardList() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam);
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible;
      },
      refetchOnWindowFocus: false,
    },
  );

  const navigate = useNavigate();

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    fetchNext();
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (data == null) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <ul>
        {cards.map((card, index) => {
          return (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
              onClick={() => {
                navigate(`/card/${card.id}`);
              }}
            />
          );
        })}
      </ul>
      {(isFetching || hasNextPage) && <div>로딩중입니다.</div>}
      <div css={refStyles} ref={ref}></div>
    </div>
  );
}

const refStyles = css`
  width: 100%;
  height: 10px;
  margin-bottom: 10px;
  touch-action: none;
`;
