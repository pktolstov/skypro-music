import styles from './non-found.module.css';
import Link from 'next/link';
export default function NotFound() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <h1 className={styles.modal__title}>404</h1>
            <div className={styles.modal__headbox}>
              <div className={styles.modal__head}>
                <h2 className={styles.modal__h2}>Страница не найдена</h2>
                <img src="/img/smile_crying.png" alt="cry_smile" />
              </div>
              <div className={styles.modal__box}>
                <p className={styles.modal__text}>
                  Возможно, она была удалена или перенесена на другой адрес
                </p>
              </div>
              <Link href="/music/main">
                <button className={styles.modal__btnEnter}>
                  Вернуться на главную
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
