import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstance, AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { ICurrenciesFilter, ICurrenciesResponse, ICurrency, ICurrencyCreate } from './interfaces';

const END_POINT: string = '/currencies';

export const CurrenciesServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<ICurrency>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: ICurrenciesFilter): Promise<ICurrenciesResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: ICurrencyCreate): Promise<IBaseResponse<ICurrency>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<ICurrencyCreate> }): Promise<IBaseResponse<ICurrency>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findMarketData: async (): Promise<
    IBaseResponse<{
      [key: string]: {
        price: string;
      };
    }>
  > => {
    try {
      const res = await AxiosInstance.get(`${END_POINT}/market-data`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
