import { useQuery } from 'react-query';
import Skeleton from '../shared/Skeleton';
import Spacing from '../shared/Spacing';

import { useInView } from 'react-intersection-observer';

export default function Review() {
  const { ref, inView } = useInView({
    // 최초에 한 번만 inview값을 업데이트 해주기 위함
    triggerOnce: true,
  });
  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((res) => {
        setTimeout(() => {
          res(['너무 좋아요', '꼭 신청하세요']);
        }, 2_000);
      });
    },
    {
      enabled: inView,
    },
  );
  console.log(inView);
  if (isLoading)
    return (
      <>
        <Skeleton width={30} height={10} />
        <Spacing size={3} />

        <Skeleton width={30} height={10} />
        <Spacing size={3} />
        <Skeleton width={30} height={10} />
        <Spacing size={3} />
      </>
    );
  return (
    <div ref={ref}>
      {data && data.map((review) => <div key={review}>{review}</div>)}
    </div>
  );
}
