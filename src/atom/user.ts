import { atom } from 'recoil';
import { UserType } from '../models/userType';

export const userAtom = atom<UserType | null>({
  key: 'auth/user',
  default: null,
});
