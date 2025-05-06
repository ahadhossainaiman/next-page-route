import { IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { IPaymentGateway } from '@modules/admin/payment-gateways/lib/interfaces';
import { AxiosError } from 'axios';
import { ICountriesFilter, ICountriesResponse, ICountry, ICountryCreate } from './interfaces';

const END_POINT: string = '/countries';

export const CountriesServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<ICountry>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: ICountriesFilter): Promise<ICountriesResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: ICountryCreate): Promise<IBaseResponse<ICountry>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<ICountryCreate> }): Promise<IBaseResponse<ICountry>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  async availablePaymentGateways(id: TId, options: IBaseFilter): Promise<IBaseResponse<IPaymentGateway[]>> {
    try {
      const res = await AxiosInstanceSecret.get(
        `${END_POINT}/${id}/available-payment-gateways?${Toolbox.queryNormalizer(options)}`,
      );
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  async addPaymentGateways(payload: { id: TId; paymentGatewayIds: TId[] }): Promise<IBaseResponse<IPaymentGateway[]>> {
    try {
      const res = await AxiosInstanceSecret.post(`${END_POINT}/${payload.id}/add-payment-gateways`, {
        paymentGateways: payload.paymentGatewayIds,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  async removePaymentGateways(payload: {
    id: TId;
    paymentGatewayIds: TId[];
  }): Promise<IBaseResponse<IPaymentGateway[]>> {
    try {
      const res = await AxiosInstanceSecret.post(`${END_POINT}/${payload.id}/remove-payment-gateways`, {
        paymentGateways: payload.paymentGatewayIds,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
};
