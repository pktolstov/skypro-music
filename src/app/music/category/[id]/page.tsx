'use client';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useParams } from 'next/navigation';
import { getTracksByIds } from '@/utils/helper';
import { useState, useEffect } from 'react';
import { getTracks, getTrackSet } from '@/services/tracksApi';
import { TrackType, TrackSetType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import styles from '../../layout.module.css';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [filteredTracks, setFilteredTracks] = useState<TrackType[]>([]);
  const [trackSet, setTrackSet] = useState<TrackSetType | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTracks = await getTracks();
        const trackSetResponse = await getTrackSet(params.id);

        console.log('trackSet:', trackSetResponse);

        const filtered = getTracksByIds(allTracks, trackSetResponse.items);

        setFilteredTracks(filtered);
        setTrackSet(trackSetResponse);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
            console.log(error.response.data);
          } else if (error.request) {
            setError(error.request.data);
            console.log(error.request);
          } else {
            setError(`Error, ${error.message}`);
            console.log('Error', error.message);
          }
        }
      }
    };

    fetchData();
  }, [params.id]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Ошибка загрузки: {error}</p>;
      </div>
    );
  }

  return (
    <Centerblock data={filteredTracks} title={trackSet ? trackSet.name : ''} />
  );
}
