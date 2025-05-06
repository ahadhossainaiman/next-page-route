import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstance, AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { IUsersResponse } from '@modules/admin/users/lib/interfaces';
import { AxiosError } from 'axios';
import { IProject, IProjectCreate, IProjectsFilter, IProjectsResponse } from './interfaces';

const END_POINT: string = '/projects';

export const ProjectsServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<IProject>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: IProjectsFilter): Promise<IProjectsResponse> => {
    try {
      const res = await AxiosInstance.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: IProjectCreate): Promise<IBaseResponse<IProject>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<IProjectCreate> }): Promise<IBaseResponse<IProject>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findInvestorsById: async (id: TId): Promise<IUsersResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}/investors`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  createShareProfit: async (payload: {
    id: TId;
    data: { month: string; year: number; amount: number };
  }): Promise<IBaseResponse> => {
    try {
      const res = await AxiosInstanceSecret.post(`${END_POINT}/${payload.id}/share-profit`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findProfitSharesById: async (
    id: TId,
  ): Promise<IBaseResponse<{ id: TId; month: string; year: number; amount: number }[]>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}/shared-profit`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
