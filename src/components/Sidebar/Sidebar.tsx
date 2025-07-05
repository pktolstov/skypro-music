'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { clearUser,setIsAuth } from '@/store/features/authSlice';
import { setFavoriteTracks } from '@/store/features/trackSlice';

export default function Sidebar() {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const username = useAppSelector((state) => state.auth.username);
  const router = useRouter();
  const displayName = isAuth? username || '' : 'Гость';
  const dispatch = useAppDispatch();

  const handleLogout = () => {
  
    if (isAuth) {
      dispatch(clearUser());
      dispatch(setIsAuth(false))
      dispatch(setFavoriteTracks([]))
      router.push('/music/main');
    } else {

      router.push('/auth/signin');
    }
 
  };
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{displayName}</p>
        <div className={styles.sidebar__icon} onClick={handleLogout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
