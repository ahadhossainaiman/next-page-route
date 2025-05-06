import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import {
  IUserVerificationRequest,
  IUserVerificationRequestCreate,
  IUserVerificationRequestsFilter,
  IUserVerificationRequestsResponse,
} from './interfaces';

const END_POINT: string = '/user-verification-requests';

export const UserVerificationRequestsServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<IUserVerificationRequest>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: IUserVerificationRequestsFilter): Promise<IUserVerificationRequestsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: IUserVerificationRequestCreate): Promise<IBaseResponse<IUserVerificationRequest>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: {
    id: TId;
    data: Partial<IUserVerificationRequestCreate>;
  }): Promise<IBaseResponse<IUserVerificationRequest>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
