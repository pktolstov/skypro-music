'use client';
import { useRef } from 'react';
import styles from './filteritem.module.css';

type FilterItemProps = {
  label: string;
  isActive: boolean;
  onClick: (label: string, buttonRef: HTMLDivElement | null) => void;
  count?: number;
};

export default function FilterItem({
  label,
  isActive,
  onClick,
  count,
}: FilterItemProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    onClick(label, buttonRef.current);
  };

  return (
    <div className={styles.filter__block}>
      <div
        ref={buttonRef}
        className={`${styles.filter__button} ${isActive ? styles.active : ''}`}
        onClick={handleClick}
      >
        {label}
        {typeof count === 'number' && (
          <div className={styles.count}>{count}</div>
        )}
      </div>
    </div>
  );
}
