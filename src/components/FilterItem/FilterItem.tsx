'use client';
import { useRef } from 'react';
import styles from './filteritem.module.css';

type FilterItemProps = {
  label: string;
  isActive: boolean;
  onClick: (label: string, buttonRef: HTMLDivElement | null) => void;
};

export default function FilterItem({ label, isActive, onClick }: FilterItemProps) {
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
      </div>
    </div>
  );
}




























// 'use client';
// import { useState, useRef } from 'react';
// import styles from './filteritem.module.css';
// import FilterModal from '../Filter/Filter';

// type FilterItemProps = {
//     label: string;
//     isActive: boolean;
//     onClick: () => void;
//     onClose: () => void;
//   };

// export default function FilterItem({
//     label,
//     isActive,
//     onClick,
//     onClose,

// }: FilterItemProps) {
// //   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [position, setPosition] = useState<{ top: number | string; left: number | string }>({ top: '15%', left: '25%' });
// //   const buttonRef = useRef<HTMLDivElement | null>(null);
// //   const handleClick = () => {
// //     if (buttonRef.current) {
// //       const rect = buttonRef.current.getBoundingClientRect();
// //       // Например, хотим показывать модалку снизу:
// //       setPosition({
// //         top: rect.bottom + window.scrollY + 8, // 8px отступ вниз
// //         left: rect.left + window.scrollX,
// //       });
// //     }
// //     setIsModalOpen((prev) => !prev);
// //   };
//   const handleSelect = (value: string) => {
//     setSelectedValue(value);
//     // setIsModalOpen(false);
//     onClose();
//   };
//   const values = [
//     'Michael Jackson',
//     'Frank Sinatra',
//     'Calvin Harris',
//     'Zhu',
//     'Arctic Monkeys',
//   ];
//   return (
//     <div className={styles.filter__block}>

//       <div className={styles.filter__button}  onClick={onClick}>
//         {label}
//       </div>
//       <div className={styles.filter__modal}>
//       {isActive && (
//         <div className={styles.filter__modal}>
//           <FilterModal
//             values={values}
//             selectedValue={selectedValue}
//             onSelect={handleSelect}
//             onClose={onClose}
//             position={position}
//           />
//         </div>
//       )}
//       </div>
     


//     </div>

//   );
// }
