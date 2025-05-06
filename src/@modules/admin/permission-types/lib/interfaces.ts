import { IBaseEntity, TId } from '@base/interfaces';

export interface IPermissionType extends IBaseEntity {
  title: string;
  isActive: boolean;
}

export interface IPermissionTypeCreate {
  title: string;
  isActive: boolean;
}

export interface IPermissionTypeUpdate {
  id: TId;
  data: Partial<IPermissionTypeCreate>;
}
