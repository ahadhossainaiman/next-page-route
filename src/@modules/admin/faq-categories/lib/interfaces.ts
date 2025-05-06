import { IBaseEntity, IBaseFilter, IBaseResponse } from '@base/interfaces';

export interface IFaqCategoriesFilter extends IBaseFilter {}

export interface IFaqCategory extends IBaseEntity {
  title: string;
  description: string;
}

export interface IFaqCategoriesResponse extends IBaseResponse {
  data: IFaqCategory[];
}

export interface IFaqCategoryCreate {
  title: string;
  description: string;
  isActive: boolean;
}
