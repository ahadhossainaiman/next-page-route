import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface ICountriesFilter extends IBaseFilter {}

export interface ICountry extends IBaseEntity {
  title: string;
  slug: string;
  flag: string;
  orderPriority: number;
}

export interface ICountriesResponse extends IBaseResponse {
  data: ICountry[];
}

export interface ICountryCreate {
  title: string;
  slug: string;
  flag: string;
  orderPriority: number;
  isActive: boolean;
}
