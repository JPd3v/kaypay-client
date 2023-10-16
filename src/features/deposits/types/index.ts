/* eslint-disable import/prefer-default-export */
interface NewDeposit {
  id: number;
  balance: number;
}

interface Deposit {
  userId: number;
  createdAt: string;
  balance: number;
  id: number;
}

export type { NewDeposit, Deposit };
