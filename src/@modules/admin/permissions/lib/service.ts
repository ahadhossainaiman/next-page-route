import { IBaseFilter, IBaseResponse } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { IPermission, IPermissionCreate, IPermissionUpdate } from './interfaces';

const END_POINT: string = '/permissions';

export const PermissionsService = {
  NAME: END_POINT,

  async find(options: IBaseFilter): Promise<IBaseResponse<IPermission[]>> {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async findById(id: string): Promise<IBaseResponse<IPermission>> {
    try {
      if (!id) return null;
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async create(payload: IPermissionCreate): Promise<IBaseResponse<IPermission>> {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async update(payload: IPermissionUpdate): Promise<IBaseResponse<IPermission>> {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async delete(id: string): Promise<IBaseResponse<IPermission>> {
    try {
      const res = await AxiosInstanceSecret.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
};
