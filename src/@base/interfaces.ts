import { IUser } from '@modules/admin/users/lib/interfaces';

export type TId = string | number;

export interface IBaseFilter {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isActive?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface IBaseEntity {
  id: TId;
  createdBy: IUser;
  createdAt: string;
  updatedBy: IUser;
  updatedAt: string;
  isActive: boolean;
}

export interface IMetaResponse {
  total: number;
  page: number;
  limit: number;
  skip: number;
}

export interface IBaseResponse<D = any> {
  success: boolean;
  statusCode: number;
  message: string;
  meta: IMetaResponse;
  data: D;
}
