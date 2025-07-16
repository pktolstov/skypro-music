import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { applyFilters } from '@/utils/applyFilters';

export type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  filters: {
    authors: string[];
    genres: string[];
    years: string;
  };
  pagePlayList: TrackType[];
  filteredTracks: TrackType[];
  searchQuery: string;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  },
  pagePlayList: [],
  filteredTracks: [],
  searchQuery: '',
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
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlayList = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => {
          return el !== author;
        });
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }

      state.filteredTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genres = action.payload;
      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => {
          return el !== genres;
        });
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      }

      state.filteredTracks = applyFilters(state);
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;
      state.filteredTracks = applyFilters(state);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFilterAuthors,
  setPagePlaylist,
  setFilterGenres,
  setFilterYears,
  setSearchQuery,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
