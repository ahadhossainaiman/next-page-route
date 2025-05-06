import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface IPaymentGatewaysFilter extends IBaseFilter {}

export interface IPaymentGateway extends IBaseEntity {
  logo: string;
  title: string;
  isAlreadyAdded: boolean;
}

export interface IPaymentGatewaysResponse extends IBaseResponse {
  data: IPaymentGateway[];
}

export interface IPaymentGatewayCreate {
  logo: string;
  title: string;
  isActive: boolean;
}
