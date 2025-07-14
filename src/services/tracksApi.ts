import axios from 'axios';
import { BASE_URL } from '@/constants';
import { TrackType, TrackSetType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

export const getFavoriteTracks = (access: string): Promise<TrackType[]> => {
  return axios(
    BASE_URL + '/catalog/track/favorite/all/',

    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  ).then((res) => {
    return res.data.data;
  });
};

export const getTrackSet = (id: string): Promise<TrackSetType> => {
  return axios(BASE_URL + '/catalog/selection/' + id + '/').then((res) => {
    return res.data.data;
  });
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};
