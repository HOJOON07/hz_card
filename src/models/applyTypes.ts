import { UserType } from './userType';

export interface Term {
  id: string;
  link?: string;
  title: string;
}

export interface ApplyValues {
  userId: UserType['uid'];
  terms: Array<Term['id']>;
  appliedAt: Date;
  cardId: string;
  salery: string;
  creditScore: string;
  payDate: string;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}
