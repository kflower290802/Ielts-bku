import { Account } from '../../accounts/domain/account';

export class Session {
  id: number | string;
  account: Account;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
