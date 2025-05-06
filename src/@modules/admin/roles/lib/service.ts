import { IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import {
  IAvailablePermissionFilter,
  IRole,
  IRoleCreate,
  IRolePermission,
  IRolePermissionApisPayload,
  IRoleUpdate,
} from './interfaces';

const END_POINT: string = '/roles';

export const RoleService = {
  NAME: END_POINT,

  async find(options: IBaseFilter): Promise<IBaseResponse<IRole[]>> {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async findById(id: string): Promise<IBaseResponse<IRole>> {
    try {
      if (!id) return null;
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async create(payload: IRoleCreate): Promise<IBaseResponse<IRole>> {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async update(payload: IRoleUpdate): Promise<IBaseResponse<IRole>> {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
  async delete(id: string): Promise<IBaseResponse<IRole>> {
    try {
      const res = await AxiosInstanceSecret.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  async availablePermissions(id: TId, options: IAvailablePermissionFilter): Promise<IBaseResponse<IRolePermission[]>> {
    try {
      if (!id) return null;
      const res = await AxiosInstanceSecret.get(
        `${END_POINT}/${id}/available-permissions?${Toolbox.queryNormalizer(options)}`,
      );
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  async addPermissions(payload: IRolePermissionApisPayload): Promise<IBaseResponse<IRolePermission[]>> {
    try {
      const res = await AxiosInstanceSecret.post(`${END_POINT}/${payload.id}/add-permissions`, {
        permissions: payload.permissionIds,
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },

  async removePermissions(payload: IRolePermissionApisPayload): Promise<IBaseResponse<IRolePermission[]>> {
    try {
      const res = await AxiosInstanceSecret.delete(`${END_POINT}/${payload.id}/remove-permissions`, {
        data: { permissions: payload.permissionIds },
      });
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error);
    }
  },
};
