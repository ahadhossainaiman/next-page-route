import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { IWithdraw, IWithdrawCreate, IWithdrawsFilter, IWithdrawsResponse } from './interfaces';

const END_POINT: string = '/withdraw-requests';

export const WithdrawsServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<IWithdraw>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: IWithdrawsFilter): Promise<IWithdrawsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findMy: async (options: IWithdrawsFilter): Promise<IWithdrawsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/my?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: IWithdrawCreate): Promise<IBaseResponse<IWithdraw>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<IWithdrawCreate> }): Promise<IBaseResponse<IWithdraw>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
