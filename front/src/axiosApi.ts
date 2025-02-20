import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { Store } from '@reduxjs/toolkit';
import { apiUrl } from './globalConstants';
import { RootState } from './app/store';

const axiosAPI = axios.create({
  baseURL: apiUrl,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

export default axiosAPI;
