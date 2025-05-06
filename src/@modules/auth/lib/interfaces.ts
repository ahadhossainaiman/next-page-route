import { IBaseResponse, TId } from '@base/interfaces';
import { TRole } from '@lib/constant';
import { TUsersType } from '@modules/admin/users/lib/enums';

export interface IToken {
  user: {
    id: TId;
    name: string;
    phoneNumber: string;
    email: string;
    isEmailVerified: boolean;
    roles: TRole[];
    type: TUsersType;
  };
  iat: number;
  exp: number;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignInSession {
  token: string;
  permissionToken: string;
  refreshToken: string;
  user: {
    id: TId;
    name: string;
    phoneNumber: string;
    email: string;
    isEmailVerified: boolean;
    roles: TRole[];
    type: TUsersType;
  };
}

export interface ISignInResponse extends IBaseResponse {
  data: ISignInSession;
}

export interface ISignUp {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  referredBy: string;
}

export interface ISession {
  isLoading: boolean;
  isAuthenticate: boolean;
  user: {
    id: TId;
    name: string;
    phoneNumber: string;
    email: string;
    isEmailVerified: boolean;
    roles: TRole[];
    type: TUsersType;
  };
  token: string;
}
