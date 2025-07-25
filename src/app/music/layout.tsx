'use client';
import { ReactNode } from 'react';
import styles from './layout.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import { useInitAuth } from '@/hooks/useInitAuth';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import Search from '@/components/Search/Search';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  useInitAuth();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <FetchingTracks />
            <Navigation />
            <div className={styles.centerblock}>
              <Search />
              {children}
            </div>

            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
