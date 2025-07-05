'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';
export default function MyPlaylist() {
  const { fetchError, fetchIsLoading, favoriteTracks } = useAppSelector(
    (state) => state.tracks,
  );
  return (
    <>
      <Centerblock
        data={favoriteTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        title={'Избранное'}
      />
    </>
  );

}
