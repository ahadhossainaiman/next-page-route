import { IBaseEntity, IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { IInvestment } from '@modules/admin/investments/lib/interfaces';
import { IUser } from '@modules/admin/users/lib/interfaces';
import { IAddressBook } from '@modules/users/address-books/lib/interfaces';
import { TWithdrawsType } from './enums';

export interface IWithdrawsFilter extends IBaseFilter {
  project?: TId;
  user?: TId;
}

export interface IWithdraw extends IBaseEntity {
  withdrawFund: TWithdrawsType;
  amount: number;
  transactionTime: string;
  status: string;
  note: string;
  approvedAt: string;
  investment: IInvestment;
  user: IUser;
  wallet: IAddressBook;
}

export interface IWithdrawsResponse extends IBaseResponse {
  data: IWithdraw[];
}

export interface IWithdrawCreate {
  withdrawFund: TWithdrawsType;
  amount: number;
  wallet: TId;
  investment: TId;
  status: string;
}
