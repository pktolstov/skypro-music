'use client'
import { useState, ChangeEvent } from 'react';
import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearchQuery } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.tracks.searchQuery);
    const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    };
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
