'use client';
import { useState } from 'react';
import styles from './centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Track from '../Track/Track';
import FilterItem from '../FilterItem/FilterItem';
import FilterModal from '../Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValueByKey } from '@/utils/helper';
import Skeleton from '../SkeletonTrack/SkeletonTrack';
type TrackDataProps = {
  data: TrackType[];
  title: string;
  isLoading: boolean;
  errorRes: null | string;
};

export default function Centerblock({
  data,
  title,
  isLoading,
  errorRes,
}: TrackDataProps) {

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [values, setValues] = useState<string[]>([]);

  const handleFilterClick = (
    label: string,
    buttonRef: HTMLDivElement | null,
  ) => {
    if (buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 38,
      });
    }

    // если клик по тому же самому активному фильтру — просто закрываем модалку
    if (activeFilter === label) {
      setActiveFilter(null);
      return;
    }

    // обновляем values в зависимости от фильтра
    if (label === 'исполнителю') {
      setValues(getUniqueValueByKey(data, 'author'));
    } else if (label === 'жанру') {
      setValues(getUniqueValueByKey(data, 'genre'));
    } else if (label === 'году выпуска') {
      // setValues(getUniqueValueByKey(data, 'release_date'));
      setValues(['По умолчанию', 'Сначала новые', 'Сначала старые']);
    }

    // открываем модалку для нового фильтра
    setActiveFilter(label);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setActiveFilter(null);
  };

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <FilterItem
          label="исполнителю"
          isActive={activeFilter === 'исполнителю'}
          count={activeFilter === 'исполнителю' ? values.length : undefined}
          onClick={handleFilterClick}
        />
        <FilterItem
          label="году выпуска"
          isActive={activeFilter === 'году выпуска'}
          onClick={handleFilterClick}
        />
        <FilterItem
          label="жанру"
          isActive={activeFilter === 'жанру'}
          onClick={handleFilterClick}
          count={activeFilter === 'жанру' ? values.length : undefined}
        />
      </div>

      {/* Глобальное модальное окно */}
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
            // <p className={styles.suspense}>Идёт загрузка треков…</p>
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
    </div>
  );
}
