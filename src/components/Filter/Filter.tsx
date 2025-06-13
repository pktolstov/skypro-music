'use client';
import styles from './filter.module.css';

type FilterModalProps = {
  values: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  position: { top: number; left: number };
};

export default function FilterModal({
  values,
  selectedValue,
  onSelect,
  onClose,
  position,
}: FilterModalProps) {
  return (
    <div
      className={styles.modal}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
        <div className={styles.scroll}>
      {values.map((value) => (
        <div
          key={value}
          className={value === selectedValue ? styles.activeItem : styles.item}
          onClick={() => onSelect(value)}
        >
          {value}
        </div>
      ))}
      </div>
    </div>
  );
}



























// 'use client';
// import styles from './filter.module.css';

// type FilterModalProps = {
//   values: string[];
//   selectedValue: string | null;
//   onSelect: (value: string) => void;
//   onClose: () => void;
//   position: { top: string | number; left: number | string };
// };

// export default function FilterModal({
//   values,
//   selectedValue,
//   onSelect,
//   onClose,
//   position,
// }: FilterModalProps) {
//   return (
//     <div className={styles.overlay} onClick={onClose}
//     style={{
//         position: 'absolute',
//         top: position.top,
//         left: position.left,
//         padding: '8px',
//         zIndex: 1000,
//       }}

//       >
//       <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//         {values.map((value) => (
//           <div
//             key={value}
//             className={
//               value === selectedValue ? styles.activeItem : styles.item
//             }
//             onClick={() => onSelect(value)}
//           >
//             {value}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
