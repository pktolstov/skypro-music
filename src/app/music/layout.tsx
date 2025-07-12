'use client';
import { ReactNode, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import styles from './layout.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import { useInitAuth } from '@/hooks/useInitAuth';
import { clearUser } from '@/store/features/authSlice';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  useInitAuth();
  // const dispatch = useAppDispatch();
  // const isAuth = useAppSelector((state) => state.auth.isAuth);
  // useEffect(() => {
  //   if (!isAuth) {
  //     dispatch(clearUser());
  //   }
  // }, [isAuth, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <FetchingTracks />
            <Navigation />
            {children}

            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
