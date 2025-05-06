import { IBaseEntity, IBaseFilter, IBaseResponse, TId } from '@base/interfaces';
import { ICategoryCategory } from '@modules/admin/category-categories/lib/interfaces';

export interface ICategorysFilter extends IBaseFilter { }

export interface ICategory extends IBaseEntity {
  statement: string;
  answer: string;
  category: ICategoryCategory;
  orderPriority: number;
}

export interface ICategorysResponse extends IBaseResponse {
  data: ICategory[];
}

export interface ICategoryCreate {
  statement: string;
  answer: string;
  category: TId;
  orderPriority: number;
  isActive: boolean;
}
