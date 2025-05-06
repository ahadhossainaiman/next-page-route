import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { IPaymentGateway, IPaymentGatewayCreate, IPaymentGatewaysFilter, IPaymentGatewaysResponse } from './interfaces';

const END_POINT: string = '/payment-gateways';

export const PaymentGatewaysServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<IPaymentGateway>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: IPaymentGatewaysFilter): Promise<IPaymentGatewaysResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: IPaymentGatewayCreate): Promise<IBaseResponse<IPaymentGateway>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: {
    id: TId;
    data: Partial<IPaymentGatewayCreate>;
  }): Promise<IBaseResponse<IPaymentGateway>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
