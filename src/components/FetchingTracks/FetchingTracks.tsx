'use client';

import { useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { getTracks, getFavoriteTracks } from '@/services/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { withReauth } from '@/utils/withReAuth';
import { setIsAuth, clearUser } from '@/store/features/authSlice';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    dispatch(setFetchIsLoading(true));

    getTracks()
      .then((res) => {
        dispatch(setAllTracks(res));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            dispatch(setFetchError(error.response.data));
          } else if (error.request) {
            dispatch(setFetchError('Сервер не отвечает. Попробуйте позже...'));
          } else {
            dispatch(
              setFetchError('Неизвестная ошибка. Обратитесь к разработчику.'),
            );
          }
        }
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false));
      });

    if (accessToken && refreshToken) {
      withReauth(
        (token) => getFavoriteTracks(token || accessToken),
        refreshToken,
        dispatch,
      )
        .then((likedTracks) => {
          dispatch(setFavoriteTracks(likedTracks));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              if (error.response.status === 401) {
                dispatch(setIsAuth(false));
                dispatch(clearUser());

                setErrorMsg('Пожалуйста, авторизуйтесь');
              } else {
                setErrorMsg(error.response.data.message);
              }
            } else if (error.request) {
              setErrorMsg('Произошла ошибка. Попробуйте позже');
            } else {
              setErrorMsg('Неизвестная ошибка');
            }
          }
        })

        .finally(() => {
          dispatch(setFetchIsLoading(false));
          if (errorMsg) {
            dispatch(setFetchError(errorMsg));
          }
        });
    }
  }, [dispatch]);

  return null;
}
