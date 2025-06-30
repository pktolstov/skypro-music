import styles from './burgerbutton.module.css';

type BurgerButtonProps = {
  isOpen: boolean;
  toggle: () => void;
};

export default function BurgerButton({ isOpen, toggle }: BurgerButtonProps) {
  return (
    <div
      className={styles.nav__burger}
      onClick={toggle}
      aria-label="Toggle menu"
      role="button"
    >
      <span
        className={`${styles.burger__line} ${isOpen ? styles.open : ''}`}
      ></span>
      <span
        className={`${styles.burger__line} ${isOpen ? styles.open : ''}`}
      ></span>
      <span
        className={`${styles.burger__line} ${isOpen ? styles.open : ''}`}
      ></span>
    </div>
  );
}
