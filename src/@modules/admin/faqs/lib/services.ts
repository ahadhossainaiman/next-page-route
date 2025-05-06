import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstance, AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { ICategory, ICategoryCreate, ICategorysFilter, ICategorysResponse } from './interfaces';

const END_POINT: string = '/categorys';

export const CategorysServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<ICategory>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: ICategorysFilter): Promise<ICategorysResponse> => {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: ICategoryCreate): Promise<IBaseResponse<ICategory>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<ICategoryCreate> }): Promise<IBaseResponse<ICategory>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
