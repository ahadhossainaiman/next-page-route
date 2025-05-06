import { IBaseEntity, IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { IUser } from '@modules/admin/users/lib/interfaces';
import { TAddressBookCoinType, TAddressBookCurrencyUnitType } from '@modules/users/address-books/lib/enums';

export interface ITransactionsFilter extends IBaseFilter {}

export interface ITransaction extends IBaseEntity {
  amount: number;
  approvedAt: string;
  approvedById: TId;
  approvedBy: IUser;
  coin: TAddressBookCoinType;
  currencyUnit: TAddressBookCurrencyUnitType;
  note: string;
  transactionFor: string;
  transactionTime: string;
  transactionType: string;
  userId: TId;
}

export interface ITransactionsResponse extends IBaseResponse {
  data: ITransaction[];
}

export interface ITransactionCreate {}
