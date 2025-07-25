'use client';

import Skeleton from '@/components/SkeletonTrack/SkeletonTrack';
import styles from './loading.module.css';

export default function loadingSkel() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.centerblock}>
              <h2 className={styles.centerblock__h2}></h2>
              <div className={styles.centerblock__filter}>
                <div className={styles.filter__title}>Искать по:</div>
                <div className={styles.filter__button}>исполнителю</div>
                <div className={styles.filter__button}>году выпуска</div>
                <div className={styles.filter__button}>жанру</div>
              </div>
              <div className={styles.centerblock__content}>
                <div className={styles.content__title}>
                  <div className={styles.playlistTitle__col}>Трек</div>
                  <div className={styles.playlistTitle__col}>Исполнитель</div>
                  <div className={styles.playlistTitle__col}>Альбом</div>
                  <div className={styles.playlistTitle__col}>
                    <svg className={styles.playlistTitle__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                    </svg>
                  </div>
                </div>
                <div className={styles.content__playlist}>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.main__sidebar}>
              <div className={styles.sidebar__personal}>
                <p className={styles.sidebar__personalName}></p>
                <div className={styles.sidebar__icon}>
                  <svg>
                    <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                  </svg>
                </div>
              </div>
            </div>
          </main>
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
