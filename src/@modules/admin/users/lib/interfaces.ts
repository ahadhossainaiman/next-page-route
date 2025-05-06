import { IBaseEntity, IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { TUsersType } from './enums';

export interface IUsersFilter extends IBaseFilter {
  type?: TUsersType;
}

export interface IUser extends IBaseEntity {
  avatar: string;
  username: string;
  name: string;
  phoneNumber: string;
  email: string;
  roles: { id: TId; title: string; isAlreadyAdded: boolean }[];
  type: TUsersType;
  isEmailVerified: boolean;
  balance: number;
  referredById: string;
  referredBy: IUser;
  verifications: { [name: string]: boolean }[];
  isKYCVerified: boolean;
  totalEarned: number;
  totalInvested: number;
  totalWithdrawed: number;
}

export interface IUsersResponse extends IBaseResponse {
  data: IUser[];
}

export interface IUserCreate {
  name: string;
  password: string;
  phoneNumber: string;
  email: string;
  roles: { role: TId }[];
  isActive: boolean;
}

export interface IUserReferences {
  user: IUser;
  references: IUser[];
}

export interface IUserAncestors {
  user: IUser;
  ancestors: IUser[];
}
