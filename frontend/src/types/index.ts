export interface NFT {
  id: string;
  title: string;
  image: string;
  price: string;
  description: string;
  unlocked: boolean;
}

export type TransactionStatus = 'pending' | 'success' | 'failed' | 'idle';

export interface Activity {
  id: string;
  type: 'payment' | 'unlock';
  status: TransactionStatus;
  address: string;
  timestamp: Date;
  hash?: string;
}
