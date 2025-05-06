import { IBaseEntity, IBaseFilter, TId } from '@base/interfaces';
import { IPermissionType } from '@modules/admin/permission-types/lib/interfaces';

export interface IPermissionFilter extends IBaseFilter {
  permissionType?: string;
}

export interface IPermission extends IBaseEntity {
  title: string;
  permissionType: IPermissionType;
}

export interface IPermissionCreate {
  title: string;
  permissionType: TId;
  isActive: boolean;
}

export interface IPermissionUpdate {
  id: TId;
  data: Partial<IPermissionCreate>;
}
