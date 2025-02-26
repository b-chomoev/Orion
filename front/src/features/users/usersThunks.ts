import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError } from '../../types';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const register = createAsyncThunk<RegisterResponse, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation: RegisterMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

       keys.forEach((key) => {
         const value = registerMutation[key];

         if (value !== null) {
           formData.append(key, value);
         }
       })

      const response = await axiosApi.post<RegisterResponse>('/users/register', formData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'users/logout',
  async (_, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', {headers: {"Authorization":  token}});
  }
);
