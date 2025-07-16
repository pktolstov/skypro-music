import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { withReauth } from '@/utils/withReAuth';
import { addLike, removeLike } from '@/services/tracksApi';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { setFetchError } from '@/store/features/trackSlice';
import { setIsAuth, clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!access) {
      return setErrorMsg('Нет авторизации');
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);
    if (track) {
      withReauth(
        (newToken) => actionApi(newToken || access, track._id),
        refresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              if (
                error.response.data.message ===
                'Токен недействителен или просрочен.'
              ) {
                dispatch(setIsAuth(false));
                dispatch(clearUser());

                setErrorMsg('Пожалуйста, авторизуйтесь');
                router.push('/auth/signin');
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
          setIsLoading(false);
          if (errorMsg) {
            dispatch(setFetchError(errorMsg));
          }
        });
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
