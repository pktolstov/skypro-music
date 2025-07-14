'use client';
import { useState, useEffect } from 'react';
import styles from './centerblock.module.css';
import classNames from 'classnames';
import Track from '../Track/Track';
import FilterItem from '../FilterItem/FilterItem';
import FilterModal from '../Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValueByKey } from '@/utils/helper';
import Skeleton from '../SkeletonTrack/SkeletonTrack';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} from '@/store/features/trackSlice';
import { setPagePlaylist } from '@/store/features/trackSlice';
type TrackDataProps = {
  data: TrackType[];
  title: string;
  isLoading: boolean;
  errorRes: null | string;
  pagePlayList: TrackType[];
};

export default function Centerblock({
  data,
  title,
  isLoading,
  errorRes,
  pagePlayList,
}: TrackDataProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filteredTracks = useAppSelector((state) => state.tracks.filteredTracks);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [values, setValues] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const onSelectAuthor = (author: string) => {
    console.log(author);
    dispatch(setFilterAuthors(author));
  };
  const handleFilterClick = (
    label: string,
    buttonRef: HTMLDivElement | null,
  ) => {
    if (buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 30,
      });
    }

    if (activeFilter === label) {
      setActiveFilter(null);
      return;
    }

    if (label === 'исполнителю') {
      setValues(getUniqueValueByKey(data, 'author'));
    } else if (label === 'жанру') {
      setValues(getUniqueValueByKey(data, 'genre'));
    } else if (label === 'году выпуска') {
      setValues(['По умолчанию', 'Сначала новые', 'Сначала старые']);
    }

    setActiveFilter(label);
  };

  const handleSelect = (value: string) => {
    setSelectedValue((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

    if (activeFilter === 'исполнителю') {
      dispatch(setFilterAuthors(value));
    } else if (activeFilter === 'жанру') {
      dispatch(setFilterGenres(value));
    } else if (activeFilter === 'году выпуска') {
      dispatch(setFilterYears(value));
      setSelectedValue([value]);
    }
  };
  useEffect(() => {
    if (!isLoading && !errorRes) {
      dispatch(setPagePlaylist(data));
    }
  }, [isLoading, errorRes]);
  return (
    <>
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <FilterItem
          label="исполнителю"
          isActive={activeFilter === 'исполнителю'}
          count={
            activeFilter === 'исполнителю'
              ? getUniqueValueByKey(filteredTracks, 'author').length
              : undefined
          }
          onClick={handleFilterClick}
          onSelect={onSelectAuthor}
        />
        <FilterItem
          label="году выпуска"
          isActive={activeFilter === 'году выпуска'}
          onClick={handleFilterClick}
          onSelect={onSelectAuthor}
        />
        <FilterItem
          label="жанру"
          isActive={activeFilter === 'жанру'}
          onClick={handleFilterClick}
          count={
            activeFilter === 'жанру'
              ? getUniqueValueByKey(filteredTracks, 'genre').length
              : undefined
          }
          onSelect={onSelectAuthor}
        />
      </div>

      {activeFilter && (
        <FilterModal
          values={values}
          selectedValue={selectedValue}
          onSelect={handleSelect}
          onClose={() => setActiveFilter(null)}
          position={position}
        />
      )}

      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {errorRes ? (
            <p className={styles.suspense}>{errorRes}</p>
          ) : isLoading ? (
            <>
              {Array.from({ length: 15 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
            </>
          ) : (
            data.map((track: TrackType) => (
              <Track key={track._id} track={track} playlist={data} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
