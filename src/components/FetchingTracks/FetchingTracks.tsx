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
import { useRouter } from 'next/navigation';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  // dispatch(setFetchError(''));
  const router = useRouter();
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
              if (
                error.response.data.message ===
                'Токен недействителен или просрочен.'
              ) {
                dispatch(setIsAuth(false));
                clearUser();
                // localStorage.removeItem('username');
                // dispatch(setFetchError('Пожалуйста, авторизуйтесь!'));
                setErrorMsg('Пожалуйста, авторизуйтесь');
                // router.push('/auth/signin');
              } else {
                setErrorMsg(error.response.data.message);
                // dispatch(setFetchError(error.response.data.message));
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

// .catch(() => {
//   dispatch(setFetchError('Ошибка загрузки избранных треков.'));
// })
