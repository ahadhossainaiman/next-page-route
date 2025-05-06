import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';
import { TProjectsStatusType } from './enums';

export interface IProjectsFilter extends IBaseFilter {
  status?: TProjectsStatusType;
}

export interface IProject extends IBaseEntity {
  title: string;
  code: string;
  description: string;
  about: string;
  banner: string;
  value: number;
  status: TProjectsStatusType;
  returnRates: { period: string; returnMin: number; returnMax: number }[];
  investmentReceived: number;
  profitShared: number;
  totalInvestor: number;
}

export interface IProjectsResponse extends IBaseResponse {
  data: IProject[];
}

export interface IProjectCreate {
  title: string;
  description: string;
  about: string;
  banner: string;
  value: number;
  status: TProjectsStatusType;
  returnRates: { period: string; returnMin: number; returnMax: number }[];
  isActive: boolean;
}
