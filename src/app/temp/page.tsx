'use client';

import Skeleton from '@/components/SkeletonTrack/SkeletonTrack';
import styles from '../music/loading.module.css';

export default function loadingSkel() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <nav className={styles.main__nav}>
              <div className={styles.nav__logo}>
                <img
                  width={250}
                  height={170}
                  className={styles.logo__image}
                  src="/img/logo.png"
                  alt={styles.logo}
                />
              </div>
              <div className={styles.nav__burger}>
                <span className={styles.burger__line}></span>
                <span className={styles.burger__line}></span>
                <span className={styles.burger__line}></span>
              </div>
            </nav>
            <div className={styles.centerblock}>
              <div className={styles.centerblock__search}>
                <svg className={styles.search__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>
                <input
                  className={styles.search__text}
                  type="search"
                  placeholder="Поиск"
                  name="search"
                />
              </div>
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
              <div className={'sidebar__block'}>
                <div className={'sidebar__list'}>
                  <div className={'sidebar__item'}>
                    <a className={'sidebar__link'} href="#">
                      <img
                        className={'sidebar__img'}
                        src="/img/playlist01.png"
                        alt="day's playlist"
                        width={250}
                        height={170}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div className={styles.bar}>
            <div className={styles.bar__content}>
              <div className={styles.bar__playerProgress}></div>
              <div className={styles.bar__playerBlock}>
                <div className={styles.bar__player}>
                  <div className={styles.player__controls}>
                    <div className={styles.player__btnPrev}>
                      <svg className={styles.player__btnPrevSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                      </svg>
                    </div>
                    <div className={styles.player__btnPlay}>
                      <svg className={styles.player__btnPlaySvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                      </svg>
                    </div>
                    <div className={styles.player__btnNext}>
                      <svg className={styles.player__btnNextSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                      </svg>
                    </div>
                    <div className={styles.player__btnRepeat}>
                      <svg className={styles.player__btnRepeatSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                      </svg>
                    </div>
                    <div className={styles.player__btnShuffle}>
                      <svg className={styles.player__btnShuffleSvg}>
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
                    <div className={styles.volume__progress}>
                      <input
                        className={styles.volume__progressLine}
                        type="range"
                        name="range"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
