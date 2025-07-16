import {
  setAccessToken,
  setRefreshToken,
  setUserName,
} from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
export const useInitAuth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';
    const username = localStorage.getItem('username') || '';
    dispatch(setAccessToken(access));
    dispatch(setRefreshToken(refresh));
    dispatch(setUserName(username));
  }, [dispatch]);
};
