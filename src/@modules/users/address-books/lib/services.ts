import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import { IAddressBook, IAddressBookCreate, IAddressBooksFilter, IAddressBooksResponse } from './interfaces';

const END_POINT: string = '/users';

export const AddressBooksServices = {
  NAME: END_POINT,

  find: async (id: TId, options: IAddressBooksFilter): Promise<IAddressBooksResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}/wallets?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: { id: TId; data: IAddressBookCreate }): Promise<IBaseResponse<IAddressBook>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}/wallets`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<IAddressBookCreate> }): Promise<IBaseResponse<IAddressBook>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}/wallets`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  delete: async (payload: { id: TId; walletId: TId }): Promise<IBaseResponse<IAddressBook>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}/wallet-remove/${payload.walletId}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
