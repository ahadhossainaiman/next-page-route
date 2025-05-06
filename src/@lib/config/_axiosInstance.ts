import { Env } from '.environments';
import { IBaseResponse } from '@base/interfaces';
import { AuthHooks } from '@modules/auth/lib/hooks';
import { getAuthToken } from '@modules/auth/lib/utils';
import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const apiUrlFn = (type: 'rest' | 'socket' = 'rest'): string => {
  const isClient = typeof window !== 'undefined';
  const apiUrl = isClient ? Env.apiUrl : Env.internalApiUrl || Env.apiUrl;

  if (type === 'socket') {
    try {
      const url = new URL(apiUrl);
      return `${url.protocol}//${url.host}`;
    } catch (error) {
      return apiUrl;
    }
  }

  return apiUrl;
};

// Axios Instance
export const AxiosInstance = axios.create({
  baseURL: apiUrlFn(),
  headers: {
    'Time-Zone-Offset': new Date().getTimezoneOffset(),
  },
});

AxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<IBaseResponse>) => {
    if (error.config.method === 'get') {
      notification.error({
        message: error.response.data.message || error.response.statusText,
      });
    }

    return error.response;
  },
);

// Axios Instance (Secret)
export const AxiosInstanceSecret = axios.create({
  ...AxiosInstance.defaults,
  headers: {
    ...AxiosInstance.defaults.headers,
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

AxiosInstanceSecret.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

AxiosInstanceSecret.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<IBaseResponse>) => {
    if ([401, 403].includes(error.response.status)) {
      notification.error({
        message: error.response.data.message || error.response.statusText,
      });
      AuthHooks.useSignOut();
    } else if (error.config.method === 'get') {
      notification.error({
        message: error.response.data.message || error.response.statusText,
      });
    }

    return error.response;
  },
);
