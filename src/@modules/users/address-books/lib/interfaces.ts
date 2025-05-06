import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface IAddressBooksFilter extends IBaseFilter {}

export interface IAddressBook extends IBaseEntity {
  title: string;
  address: string;
  coin: string;
  currencyUnit: string;
}

export interface IAddressBooksResponse extends IBaseResponse {
  data: IAddressBook[];
}

export interface IAddressBookCreate {
  title: string;
  address: string;
  coin: string;
  currencyUnit: string;
}
