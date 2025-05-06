import { IBaseEntity, IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { TUserVerificationRequestsContentType } from './enums';

export interface IUserVerificationRequestsFilter extends IBaseFilter {
  user?: TId;
}

export interface IUserVerificationRequest extends IBaseEntity {
  content: string;
  title: string;
  contentType: TUserVerificationRequestsContentType;
  status: string;
  user: TId;
}

export interface IUserVerificationRequestsResponse extends IBaseResponse {
  data: IUserVerificationRequest[];
}

export interface IUserVerificationRequestCreate {
  content: string;
  title: string;
  contentType: TUserVerificationRequestsContentType;
  status: string;
  user: TId;
  isActive: boolean;
}
