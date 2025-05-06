import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { IUser, IUserAncestors, IUserCreate, IUserReferences, IUsersFilter, IUsersResponse } from './interfaces';

const END_POINT: string = '/users';

export const UsersServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<IUser>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: IUsersFilter): Promise<IUsersResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: IUserCreate): Promise<IBaseResponse<IUser>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<IUserCreate> }): Promise<IBaseResponse<IUser>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findUsernameExist: async (username: string): Promise<IBaseResponse<{ isUsernameExist: boolean }>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${username}/is-exists`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  references: async (id: TId): Promise<IBaseResponse<IUserReferences>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}/references`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  ancestors: async (id: TId): Promise<IBaseResponse<IUserAncestors>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}/ancestors`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  myProfile: async (): Promise<IBaseResponse<IUser>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/my-profile`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  myReferences: async (): Promise<IBaseResponse<IUserReferences>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/my-references`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  myAncestors: async (): Promise<IBaseResponse<IUserAncestors>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/my-ancestors`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
