// components/Navigation/Navigation.tsx
'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './navigation.module.css';
import BurgerButton from '@/components/BurgerButton/BurgerButton';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={113}
          height={17}
          className={'logo__image'}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>

      <BurgerButton isOpen={menuOpen} toggle={toggleMenu} />

      <div
        className={`${styles.nav__menu} ${
          menuOpen ? styles.nav__menu_open : ''
        }`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="../signin.html" className={styles.menu__link}>
              Войти
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}















// import Image from 'next/image';
// import Link from 'next/link';
// import styles from './navigation.module.css';
// export default function Navigation() {
//   return (
//     <nav className={styles.main__nav}>
//       <div className={styles.nav__logo}>
//         <Image
//           width={113}
//           height={17}
//           className={'logo__image'}
//           src="/img/logo.png"
//           alt={'logo'}
//         />
//       </div>
//       <div className={styles.nav__burger}>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//         <span className={styles.burger__line}></span>
//       </div>
//       <div className={styles.nav__menu}>
//         <ul className={styles.menu__list}>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Главное
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             <Link href="#" className={styles.menu__link}>
//               Мой плейлист
//             </Link>
//           </li>
//           <li className={styles.menu__item}>
//             <Link href="../signin.html" className={styles.menu__link}>
//               Войти
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
