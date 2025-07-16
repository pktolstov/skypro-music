'use client';
import { useState, useEffect } from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { applySearch } from '@/utils/applySearch';
export default function Home() {
  const {
    fetchError,
    fetchIsLoading,
    allTracks,
    filteredTracks,
    filters,
    searchQuery,
  } = useAppSelector((state) => state.tracks);
  const [playList, setPlayList] = useState<TrackType[]>([]);
  useEffect(() => {
    const hasActiveFilters =
      filters.authors.length > 0 ||
      filters.genres.length > 0 ||
      filters.years !== 'По умолчанию';

    const currentPlayList = hasActiveFilters ? filteredTracks : allTracks;
    const searchedTracks = applySearch(currentPlayList, searchQuery);
    setPlayList(searchedTracks);
  }, [filteredTracks, allTracks, filters, searchQuery]);

  return (
    <>
      <Centerblock
        pagePlayList={allTracks}
        data={playList}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        title={'Треки'}
      />
    </>
  );
}
