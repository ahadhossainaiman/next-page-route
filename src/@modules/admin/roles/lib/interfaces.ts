import { IBaseEntity, IBaseFilter, TId } from '@base/interfaces';
import { IPermissionType } from '@modules/admin/permission-types/lib/interfaces';

export interface IRole extends IBaseEntity {
  title: string;
}

export interface IAvailablePermissionFilter extends IBaseFilter {
  permissionType?: TId;
}

export interface IRoleCreate {
  title: string;
  isActive: boolean;
}

export interface IRoleUpdate {
  id: TId;
  data: Partial<IRoleCreate>;
}

export interface IRolePermissionApisPayload {
  id: TId;
  permissionIds: TId[];
}

export interface IRolePermission extends IBaseEntity {
  isAlreadyAdded: boolean;
  title: string;
  permissionTypeId: TId;
  permissionType: IPermissionType;
}
