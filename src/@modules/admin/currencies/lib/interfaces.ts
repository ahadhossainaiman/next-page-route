import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface ICurrenciesFilter extends IBaseFilter {}

export interface ICurrency extends IBaseEntity {
  title: string;
  currencyCode: string;
  currencySymbol: string;
  value: string;
}

export interface ICurrenciesResponse extends IBaseResponse {
  data: ICurrency[];
}

export interface ICurrencyCreate {
  title: string;
  currencyCode: string;
  currencySymbol: string;
  value: string;
  isActive: boolean;
}
