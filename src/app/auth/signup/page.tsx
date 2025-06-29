'use client';
import styles from './signup.module.css';
import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { signUp } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { setUser } from '@/store/features/authSlice';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await signUp(formData);

      if (user) {
        dispatch(setUser(user));
        router.push('/music/main');
      }
    } catch (err: any) {
      setError(err.message || 'Что-то пошло не так');
    }
  };
  return (
    <>
      <form className={styles.modal__form} onSubmit={handleSubmit}>
        <Link href="/music/main">
          <div className={styles.modal__logo}>
            <Image
              src="/img/logo_modal.png"
              alt="logo"
              width={140}
              height={21}
            />
          </div>
        </Link>
        <input
          className={classNames(styles.modal__input, styles.login)}
          type="text"
          name="username"
          placeholder="Имя"
          autoComplete="username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          className={styles.modal__input}
          type="email"
          name="email"
          placeholder="Почта"
          autoComplete="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          className={styles.modal__input}
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className={styles.errorContainer}>{error}</div>
        <button disabled={isLoading} className={styles.modal__btnSignupEnt}>
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}
