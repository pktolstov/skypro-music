import { ReactNode } from 'react';
import styles from './layout.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import { Suspense } from 'react';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Navigation />
            {/* <Suspense fallback={<p className={styles.suspense}>Загрузка треков...</p>}>{children}</Suspense> */}
            {children}
            {/* <Centerblock /> */}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
