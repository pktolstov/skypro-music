import styles from './layout.module.css';

export default function MusicLoading() {
  return <p className={styles.suspense}>Идёт загрузка треков…</p>;
}
