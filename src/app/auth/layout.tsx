import { ReactNode, } from 'react';
import styles from './layout.module.css'
import { ToastContainer } from 'react-toastify';

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
 

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <div className={styles.modal__form}> {children}</div>
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    </>
  );
}
