'use client';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useParams } from 'next/navigation';
import { getTracksByIds } from '@/utils/helper';
import { useState, useEffect } from 'react';
import { getTrackSet } from '@/services/tracksApi';
import { TrackType, TrackSetType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useAppSelector, useAppDispatch } from '@/store/store';
import styles from '../../layout.module.css';
import { setPagePlaylist } from '@/store/features/trackSlice';
import { applySearch } from '@/utils/applySearch';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    allTracks,
    fetchIsLoading,
    fetchError,
    filteredTracks,
    filters,
    searchQuery,
  } = useAppSelector((state) => state.tracks);
  const [isLoading, setIsLoading] = useState(true);
  // const [filteredTracksState, setFilteredTracks] = useState<TrackType[]>([]);
  const [trackSet, setTrackSet] = useState<TrackSetType | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!fetchIsLoading && allTracks.length) {
        try {
          const trackSetResponse = await getTrackSet(params.id);

          const filtered = getTracksByIds(allTracks, trackSetResponse.items);
          dispatch(setPagePlaylist(filtered));
          setTrackSet(trackSetResponse);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(error.response.data);
            } else if (error.request) {
              setError(error.request.data);
            } else {
              setError(`Error, ${error.message}`);
            }
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [fetchIsLoading, allTracks, params.id, dispatch]);

  const hasFilters =
    filters.authors.length > 0 ||
    filters.genres.length > 0 ||
    filters.years !== 'По умолчанию';

  const baseTracks = hasFilters ? filteredTracks : allTracks;
  const searchedTracks = applySearch(baseTracks, searchQuery);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Ошибка загрузки: {error}</p>;
      </div>
    );
  }

  return (
    <Centerblock
      isLoading={isLoading}
      errorRes={error || fetchError}
      data={searchedTracks}
      title={trackSet ? trackSet.name : ''}
      pagePlayList={[]}
    />
  );
}
