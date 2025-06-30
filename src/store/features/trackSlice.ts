import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curIndex < playlist.length - 1) {
        const nextIndexTrack = curIndex + 1;
        state.currentTrack = playlist[nextIndexTrack];
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curIndex > 0) {
        const nextIndexTrack = curIndex - 1;
        state.currentTrack = playlist[nextIndexTrack];
      }
    },

    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },

  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  toggleShuffle,
  setPrevTrack,
  setFetchIsLoading,
  setFetchError,
  setAllTracks, 

} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
