import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { IFaqCategoriesFilter, IFaqCategoriesResponse, IFaqCategory, IFaqCategoryCreate } from './interfaces';

const END_POINT: string = '/faq-categories';

export const FaqCategoriesServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<IFaqCategory>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: IFaqCategoriesFilter): Promise<IFaqCategoriesResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: IFaqCategoryCreate): Promise<IBaseResponse<IFaqCategory>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<IFaqCategoryCreate> }): Promise<IBaseResponse<IFaqCategory>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
