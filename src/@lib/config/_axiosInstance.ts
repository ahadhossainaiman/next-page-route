// import { Env } from '.environments';
// import { IBaseResponse } from '@base/interfaces';
// import { AuthHooks } from '@modules/auth/lib/hooks';
// import { getAuthToken } from '@modules/auth/lib/utils';
// import { notification } from 'antd';
// import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// export const apiUrlFn = (type: 'rest' | 'socket' = 'rest'): string => {
//   const isClient = typeof window !== 'undefined';
//   console.log('=====>ahad', isClient, Env.internalApiUrl);

//   const apiUrl = isClient ? Env.apiUrl : Env.internalApiUrl || Env.apiUrl;

//   console.log('=========>', apiUrl);

//   if (type === 'socket') {
//     try {
//       const url = new URL('https://fibo-api-stg.ichinglab.com/api/v1/internal');
//       console.log('======>>', `${url?.protocol}//${url.host}`);

//       return `${url?.protocol}//${url.host}`;
//     } catch (error) {
//       return apiUrl;
//     }
//   }

//   return apiUrl;
// };

// // Axios Instance
// export const AxiosInstance = axios.create({
//   baseURL: apiUrlFn(),
//   headers: {
//     'Time-Zone-Offset': new Date().getTimezoneOffset(),
//   },
// });

// AxiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => config,
//   (error: AxiosError) => Promise.reject(error),
// );

// AxiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError<IBaseResponse>) => {
//     if (error.config.method === 'get') {
//       notification.error({
//         message: error.response.data.message || error.response.statusText,
//       });
//     }

//     return error.response;
//   },
// );

// // Axios Instance (Secret)
// export const AxiosInstanceSecret = axios.create({
//   ...AxiosInstance.defaults,
//   headers: {
//     ...AxiosInstance.defaults.headers,
//     Authorization: `Bearer ${getAuthToken()}`,
//   },
// });

// AxiosInstanceSecret.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => config,
//   (error: AxiosError) => Promise.reject(error),
// );

// AxiosInstanceSecret.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError<IBaseResponse>) => {
//     if ([401, 403].includes(error.response.status)) {
//       notification.error({
//         message: error.response.data.message || error.response.statusText,
//       });
//       AuthHooks.useSignOut();
//     } else if (error.config.method === 'get') {
//       notification.error({
//         message: error.response.data.message || error.response.statusText,
//       });
//     }

//     return error.response;
//   },
// );

import { Env } from '.environments';
import { IBaseResponse } from '@base/interfaces';
import { AuthHooks } from '@modules/auth/lib/hooks';
import { getAuthToken } from '@modules/auth/lib/utils';
import { notification } from 'antd';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const apiUrlFn = (type: 'rest' | 'socket' = 'rest'): string => {
  const isClient = typeof window !== 'undefined';
  console.log('=====>ahad', isClient, Env.internalApiUrl);

  const apiUrl = isClient ? Env.apiUrl : Env.internalApiUrl || Env.apiUrl;

  console.log('=========>', apiUrl);

  if (type === 'socket') {
    try {
      const url = new URL('https://fibo-api-stg.ichinglab.com/api/v1/internal');
      console.log('======>>', `${url.protocol}//${url.host}`);

      return `${url.protocol}//${url.host}`;
    } catch (error) {
      console.error('Error in URL parsing:', error); // Log the error for debugging
      return apiUrl; // Fallback to the default API URL
    }
  }

  return apiUrl;
};
// console.log('asdsadasd', process.env);

const url = 'https://fibo-api-stg.ichinglab.com/api/v1/internal';
console.log('dfsfdsfsd0', url);

// Axios Instance
export const AxiosInstance = axios.create({
  // baseURL: apiUrlFn(),

  baseURL: `${url}`,
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
    // Check if error.response exists to avoid undefined errors
    if (error.response) {
      const errorMessage = error.response.data?.message || error.response.statusText;
      if (error.config.method === 'get') {
        notification.error({
          message: errorMessage,
        });
      }
      return error.response;
    }
    // Handle case where error.response is undefined (e.g., network errors)
    notification.error({
      message: 'Network error or no response from server.',
    });
    return Promise.reject(error); // Reject the promise in case of network issues
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
    if (error.response) {
      const errorMessage = error.response.data?.message || error.response.statusText;

      if ([401, 403].includes(error.response.status)) {
        notification.error({
          message: errorMessage,
        });
        AuthHooks.useSignOut();
      } else if (error.config.method === 'get') {
        notification.error({
          message: errorMessage,
        });
      }

      return error.response;
    }

    // Handle case where error.response is undefined
    notification.error({
      message: 'Network error or no response from server.',
    });
    return Promise.reject(error); // Reject the promise in case of network issues
  },
);
