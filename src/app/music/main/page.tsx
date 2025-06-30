'use client';
import { useState } from 'react';
import styles from '../layout.module.css';
import { getTracks } from '@/services/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const Centerblock = dynamic(
    () => import('@/components/Centerblock/Centerblock'),
    {
      loading: () => <p className={styles.suspense}>Идёт загрузка треков…</p>,
      ssr: false, 
    },
  );
  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError(error.request.data);
          } else {
            setError(`Error, ${error.message}`);
          }
        }
      });
  }, []);
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Ошибка загрузки: {error}</p>;
      </div>
    );
  }

  return <Centerblock data={tracks} title="Треки" />;
}
