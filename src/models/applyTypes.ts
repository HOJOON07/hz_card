import { UserType } from './userType';

export interface Term {
  id: string;
  link?: string;
  title: string;
}

export const APPLY_STAUTS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const;

export interface ApplyValues {
  userId: UserType['uid'];
  terms: Array<Term['id']>;
  appliedAt: Date;
  cardId: string;
  salery: string;
  creditScore: string;
  payDate: string;
  isMaster: boolean;
  isHipass: boolean;
  isRf: boolean;
  status: keyof typeof APPLY_STAUTS;
  step: number;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}

// terms: ['01', '02'];
// creditScore: '600점 이상';
// isHipass: true;
// isMaster: true;
// isRf: true;
// payDate: '25일';
// salery: '1억원 초과';
