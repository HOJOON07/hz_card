import Button from '../shared/Button';
import { adBanners } from '../../Mock/data';

import { store } from '../../remote/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { COLEECTIONS } from '../../constants';

export default function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store);

    adBanners.forEach((adCard) => {
      const docRef = doc(collection(store, COLEECTIONS.ADBANNER));

      batch.set(docRef, adCard);
    });

    await batch.commit();
    alert('배너 리스트 추가 완료');
  };
  return (
    <Button onClick={handleButtonClick}>카드광고 리스트 버튼 추가하기</Button>
  );
}
