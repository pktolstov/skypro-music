'use client';
import styles from './filter.module.css';

type FilterModalProps = {
  values: string[];
  selectedValue: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
  position: { top: number; left: number };
};

export default function FilterModal({
  values,
  selectedValue,
  onSelect,
  position,
}: FilterModalProps) {
  return (

    <div className={styles.modal} style={{ top: position.top, left: position.left }}>
      <div className={styles.scroll}>
        {values.map((value) => {
          const isActive = selectedValue.includes(value);
          return (
            <div
              key={value}
              className={isActive ? styles.activeItem : styles.item}
              onClick={() => onSelect(value)}
            >
              {value}
              {isActive && <span style={{ marginLeft: 8 }}>✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
