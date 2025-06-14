'use client';
import Link from 'next/link';
import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRef, useEffect, useState } from 'react';
import { setIsPlay } from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helper';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(0.5)
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlay) {
      audio.play().catch((err) => console.warn('Autoplay error:', err));
    } else {
      audio.pause();
    }
  }, [isPlay, currentTrack]);

  if (!currentTrack) return <></>;
  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };
  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };
  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };
  const onToggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };
  const onTimeUpdate = () => {
    if (audioRef.current) console.log(audioRef.current.currentTime);
    console.log(audioRef.current?.duration);
    console.log(audioRef.current?.volume);

  };
  const onLoadedMetaData = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true))
    }
     
  };
  const onVolumeChange = (e) => {
    setVolume(Number(e.target.value));
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value) / 100;
      console.log(volume);
    }
  }
  const alertDev = () => {
    alert('Данный функционал в разработке');
  };
  return (
    <div className={styles.bar}>
      <audio
        className={styles.audio}
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        preload="auto"
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetaData}
      ></audio>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={alertDev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={!isPlay ? playTrack : pauseTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      !isPlay
                        ? '/img/icon/sprite.svg#icon-play'
                        : '/img/icon/pause.svg'
                    }
                  ></use>
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={alertDev}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={onToggleLoop}
              >
                <svg
                  className={classNames(styles.player__btnRepeatSvg, {
                    [styles.player__iconActive]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={onToggleShuffle}
              >
                <svg
                  className={classNames(styles.player__btnShuffleSvg, {
                    [styles.player__iconActive]: isShuffle,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack?.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack?.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={onVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
