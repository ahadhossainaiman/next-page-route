import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { ITransaction, ITransactionCreate, ITransactionsFilter, ITransactionsResponse } from './interfaces';

const END_POINT: string = '/user-transactions';

export const TransactionsServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<ITransaction>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: ITransactionsFilter): Promise<ITransactionsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findByUser: async (id: TId, options: ITransactionsFilter): Promise<ITransactionsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findMy: async (options: ITransactionsFilter): Promise<ITransactionsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/my?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: ITransactionCreate): Promise<IBaseResponse<ITransaction>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<ITransactionCreate> }): Promise<IBaseResponse<ITransaction>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
