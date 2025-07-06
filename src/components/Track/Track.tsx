'use client';
import styles from './track.module.css';
import Link from 'next/link';
import { formatTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlay,
} from '@/store/features/trackSlice';
import classNames from 'classnames';
import { useLikeTrack } from '@/hooks/useLikeTracks';

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
};
export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();
  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setCurrentPlaylist(playlist));
  };
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isCurrent = currentTrack?._id === track._id;
  const { isLike, isLoading, toggleLike } = useLikeTrack(track);

  return (
    <div
      key={track._id}
      className={styles.playlist__item}
      onClick={onClickTrack}
    >
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div
            className={classNames(styles.track__titleImage, {
              [styles.track_active]: isCurrent,
              [styles.track_pulse]: isCurrent && isPlay,
            })}
          >
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div>
            <Link className={styles.track__titleLink} href="">
              {track.name}
              <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          {!isAuth ? (
            
            <svg
              className={classNames(styles.track__timeSvg, {
                [styles.track__timeSvg_loading]: isLoading,
              })}

            >
              <use
                xlinkHref="/img/icon/sprite.svg#icon-dislike"
              ></use>
            </svg>
          ) : (
            <svg
              className={classNames(styles.track__timeSvg, {
                [styles.track__timeSvg_loading]: isLoading,
              })}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike();
              }}
            >
              <use
                xlinkHref={isLike ? '/img/icon/pinklike.svg' : '/img/icon/sprite.svg#icon-like'}
              ></use>
            </svg>
          )}
       
            <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
         

        </div>
      </div>
    </div>
  );
}
