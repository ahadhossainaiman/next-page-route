import { IBaseResponse, TId } from '@base/interfaces';
import { AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn, Toolbox } from '@lib/utils';
import { AxiosError } from 'axios';
import {
  IInvestment,
  IInvestmentCreate,
  IInvestmentPayment,
  IInvestmentPaymentCreate,
  IInvestmentPaymentSettle,
  IInvestmentsFilter,
  IInvestmentsResponse,
} from './interfaces';

const END_POINT: string = '/investments';

export const InvestmentsServices = {
  NAME: END_POINT,

  findById: async (id: TId): Promise<IBaseResponse<IInvestment>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  find: async (options: IInvestmentsFilter): Promise<IInvestmentsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findMy: async (options: IInvestmentsFilter): Promise<IInvestmentsResponse> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/my?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  findPayments: async (id: TId, options: IInvestmentsFilter): Promise<IBaseResponse<IInvestmentPayment[]>> => {
    try {
      const res = await AxiosInstanceSecret.get(`${END_POINT}/${id}/payments?${Toolbox.queryNormalizer(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  create: async (payload: IInvestmentCreate): Promise<IBaseResponse<IInvestment>> => {
    try {
      const res = await AxiosInstanceSecret.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  update: async (payload: { id: TId; data: Partial<IInvestmentCreate> }): Promise<IBaseResponse<IInvestment>> => {
    try {
      const res = await AxiosInstanceSecret.patch(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  createPayment: async (payload: { id: TId; data: IInvestmentPaymentCreate }): Promise<IBaseResponse<IInvestment>> => {
    try {
      const res = await AxiosInstanceSecret.post(`${END_POINT}/${payload.id}/make-payment`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  settlePayment: async (payload: IInvestmentPaymentSettle): Promise<IBaseResponse<IInvestment>> => {
    try {
      const res = await AxiosInstanceSecret.post(`${END_POINT}/settle-payment`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
