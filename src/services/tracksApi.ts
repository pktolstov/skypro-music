import axios from 'axios';
import { BASE_URL } from '@/constants';
import { TrackType,TrackSetType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

export const getTrackSet = (id:string): Promise<TrackSetType> => {
    return axios(BASE_URL+'/catalog/selection/'+id+'/').then((res) => {
        return res.data.data;
    })
    
}