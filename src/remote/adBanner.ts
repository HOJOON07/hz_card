import { collection, doc, getDocs } from 'firebase/firestore';
import { store } from './firebase';

import { COLLECTIONS } from '../constants';
import { AdBanner } from '../models/card';

async function getAdBanners() {
  const adBannerSnapShot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  );
  return adBannerSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }));
  // console.log('cardSnapShot', cardSnapshot);
}

export default getAdBanners;
