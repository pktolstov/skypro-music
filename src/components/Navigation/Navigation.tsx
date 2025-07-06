'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './navigation.module.css';
import BurgerButton from '@/components/BurgerButton/BurgerButton';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { clearUser, setIsAuth } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuth =  useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const handleLogout = () => {
    if (isAuth) {
      dispatch(clearUser());
      dispatch(setIsAuth(false));
      router.push('/music/main');
    } else {
      router.push('/auth/signin');
    }
  };
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      dispatch(setIsAuth(true));
    }
  }, [dispatch]);

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main">
          <Image
            width={113}
            height={17}
            className={'logo__image'}
            src="/img/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>

      <BurgerButton isOpen={menuOpen} toggle={toggleMenu} />

      <div
        className={`${styles.nav__menu} ${
          menuOpen ? styles.nav__menu_open : ''
        }`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href={isAuth? '/music/liked' : '/auth/signin'} className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item} onClick={handleLogout}>
            <div className={styles.menu__link}>
              {isAuth ? 'Выйти' : 'Войти'}
            </div>

            {/* <Link href={isAuth? '/music/main' : '/auth/signin'} className={styles.menu__link}>
              
            </Link> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}
