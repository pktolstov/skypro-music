import { refreshToken } from '@/services/auth';
import { setAccessToken } from '@/store/features/authSlice';
import { AxiosError } from 'axios';
import { AppDispatch } from '@/store/store';

export const withReauth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,

): Promise<T> => {
  try {
    return await apiFunction('');
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshToken(refresh);
        dispatch(setAccessToken(newAccessToken.access));
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    throw error;
  }
};
