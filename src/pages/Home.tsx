import { Suspense } from 'react';
import AdBanners from '../components/home/AdBanners';
import CardList from '../components/home/CardList';
import Button from '../components/shared/Button';
import ListRow from '../components/shared/ListRow';
import Top from '../components/shared/Top';

export default function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      ></Top>
      <Button>안녕하세요 </Button>
      <AdBanners />
      <Button>안녕하세요 </Button>
      <Suspense
        fallback={[
          ...new Array(10).map((_, idx) => <ListRow.Skeleton key={idx} />),
        ]}
      >
        <CardList />
      </Suspense>
      <Button>안녕하세요 </Button>
    </div>
  );
}
