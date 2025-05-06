import { IBaseEntity, IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import { IUser } from '@modules/admin/users/lib/interfaces';
import { TAddressBookCoinType, TAddressBookCurrencyUnitType } from '@modules/users/address-books/lib/enums';
import { TPaymentStatus } from './enums';

export interface IInvestmentsFilter extends IBaseFilter {
  project?: TId;
  user?: TId;
}

export interface IInvestment extends IBaseEntity {
  investmentAmount: number;
  profitAmount: number;
  returnRate: number;
  lockedPeriod: string;
  profitReturnCount: number;
  effectiveFrom: string;
  ageInDays: number;
  isMatured: boolean;
  hasWithdrawn: boolean;
  status: string;
  paymentStatus: string;
  user: IUser;
  project: IProject;
  referredBy: IUser;
  projectId: TId;
  userId: TId;
  referredById: TId;
}

export interface IInvestmentsResponse extends IBaseResponse {
  data: IInvestment[];
}

export interface IInvestmentCreate {
  investmentAmount: number;
  lockedPeriod: string;
  project: TId;
  referredBy: string;
}

export interface IInvestmentPaymentCreate {
  userWallet: number;
  investmentAmount: number;
  depositAddress: string;
  coin: TAddressBookCoinType;
  currencyUnit: TAddressBookCurrencyUnitType;
  transferProof: string;
  note: string;
}

export interface IInvestmentPaymentSettle {
  payment: TId;
  status: TPaymentStatus;
  note: string;
}

export interface IInvestmentPayment extends IBaseEntity {
  investmentAmount: number;
  depositAddress: string;
  coin: TAddressBookCoinType;
  currencyUnit: TAddressBookCurrencyUnitType;
  note: string;
  transferProof: string;
  status: string;
  paymentStatus: TPaymentStatus;
  userWallet: IBaseEntity & {
    title: string;
    address: string;
    coin: TAddressBookCoinType;
    currencyUnit: TAddressBookCurrencyUnitType;
    userId: TId;
  };
  user: IUser;
  investmentId: TId;
  userId: TId;
  userWalletId: TId;
}
