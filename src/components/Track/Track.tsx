'use client';
import styles from './track.module.css';
import Link from 'next/link';
import { formatTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import classNames from 'classnames';

type TrackProps = {
  track: TrackType;
};
export default function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
  };
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isCurrent = currentTrack?._id === track._id;

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
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
