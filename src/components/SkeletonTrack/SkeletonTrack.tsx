import styles from './skeletontrack.module.css';
import Image from 'next/image';

export default function Skeleton() {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <Image
              alt="Song"
              src={'/img/skeleton/song_name.png'}
              width={51}
              height={51}
            ></Image>
          </div>
          <div className={styles.track__titleLink}>
            <Image
              alt="Song"
              src={'/img/skeleton/song_name.png'}
              width={306}
              height={19}
            ></Image>
          </div>
        </div>
        <div className={styles.track__author}>
          <Image
            alt="Author"
            src={'/img/skeleton/song_author.png'}
            width={251}
            height={19}
          ></Image>
        </div>
        <div className={styles.track__album}>
          <Image
            alt="Album"
            src={'/img/skeleton/album.png'}
            width={256}
            height={19}
          ></Image>
        </div>
      </div>
    </div>
  );
}
