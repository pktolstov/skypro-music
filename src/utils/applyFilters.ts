import { TrackType } from '@/sharedTypes/sharedTypes';
import { initialStateType } from '@/store/features/trackSlice';
export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = state.pagePlayList;

  if (state.filters.authors.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.authors.includes(track.author);
    });
  }
  if (state.filters.genres.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.genres.some((el) => track.genre.includes(el));
    });
  }
  if (state.filters.years === 'Сначала новые') {
    filteredPlaylist = filteredPlaylist.sort((a, b) =>
      b.release_date.localeCompare(a.release_date),
    );
  } else if (state.filters.years === 'Сначала старые') {
    filteredPlaylist = filteredPlaylist.sort((a, b) =>
      a.release_date.localeCompare(b.release_date),
    );
  }

  return filteredPlaylist;
};
