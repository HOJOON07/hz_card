import { collection, doc, getDocs } from 'firebase/firestore';
import { store } from './firebase';

import { COLEECTIONS } from '../constants';
import { Card } from '../models/card';

async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLEECTIONS.CARD));
  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));
  // console.log('cardSnapShot', cardSnapshot);
}

export default getCards;
