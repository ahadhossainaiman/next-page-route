import { IBaseResponse } from '@base/interfaces';
import { AxiosInstance, AxiosInstanceSecret } from '@lib/config';
import { responseHandlerFn } from '@lib/utils';
import { AxiosError } from 'axios';
import { ISignIn, ISignInResponse, ISignUp } from './interfaces';

const END_POINT: string = '/auth';

export const AuthServices = {
  NAME: END_POINT,

  signIn: async (payload: ISignIn): Promise<ISignInResponse> => {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/login`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  signUp: async (payload: ISignUp): Promise<IBaseResponse<{ hash: string; identifier: string; otp: number }>> => {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/register`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  passwordUpdate: async (payload: { oldPassword: string; newPassword: string }): Promise<IBaseResponse> => {
    try {
      const res = await AxiosInstanceSecret.post(`${END_POINT}/change-password`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  async resetPassword(payload: {
    email: string;
  }): Promise<IBaseResponse<{ hash: string; email: string; otp: string }>> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/reset-password-request`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  async resetPasswordVerify(payload: {
    hash: string;
    email: string;
    newPassword: string;
    otp: number;
  }): Promise<IBaseResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/reset-password-verify`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  async sendOtp(payload: {
    identifier: string;
  }): Promise<IBaseResponse<{ hash: string; identifier: string; otp: string }>> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/send-otp`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },

  async verifyOtp(payload: { hash: string; identifier: string; otp: number }): Promise<ISignInResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/verify-otp`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw responseHandlerFn(error as AxiosError);
    }
  },
};
