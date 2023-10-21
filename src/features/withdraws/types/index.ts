/* eslint-disable import/prefer-default-export */

interface Withdraw {
  id: number;
  userId: number;
  balance: number;
  createdAt: string;
  bank: string;
  aliasCbu: string;
}

export type { Withdraw };
