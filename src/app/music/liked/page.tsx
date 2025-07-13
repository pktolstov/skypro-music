'use client';
import { useEffect, useState } from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { setPagePlaylist } from '@/store/features/trackSlice';
import { applySearch } from '@/utils/applySearch'
export default function MyPlaylist() {
  //   const { fetchError, fetchIsLoading, favoriteTracks } = useAppSelector(
  //     (state) => state.tracks,
  //   );
  const dispatch = useAppDispatch();
  const {
    fetchError,
    fetchIsLoading,
    filteredTracks,
    filters,
    favoriteTracks,
    searchQuery,
  } = useAppSelector((state) => state.tracks);
  const [playList, setPlayList] = useState<TrackType[]>([]);
  useEffect(() => {
    if (!fetchIsLoading && !fetchError) {
      dispatch(setPagePlaylist(favoriteTracks)); // ✅ Обновляем плейлист для фильтрации
    }
  }, [fetchIsLoading, fetchError, favoriteTracks]);
  useEffect(() => {
    const hasActiveFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.years !== 'По умолчанию';

      const baseList = hasActiveFilters ? filteredTracks : favoriteTracks;
      const searchedList = applySearch(baseList, searchQuery);
  
      setPlayList(searchedList);
    // setPlayList(currentPlayList);
  }, [filteredTracks, favoriteTracks, filters, searchQuery]);
  return (
    <>
      <Centerblock
        data={playList}
        pagePlayList={favoriteTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        title={'Избранное'}
      />
    </>
  );
}
