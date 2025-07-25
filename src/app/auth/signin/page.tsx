'use client';

import styles from './signin.module.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  setAccessToken,
  setRefreshToken,
  setUser,
  setUserName,
  setIsAuth,
} from '@/store/features/authSlice';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { getTokens, signIn } from '@/services/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const user = await signIn(formData);

      if (user) {
        const tokens = await getTokens(formData);
        dispatch(setAccessToken(tokens.access));
        dispatch(setRefreshToken(tokens.refresh));
        dispatch(setUser(user));
        dispatch(setUserName(user.username));
        dispatch(setIsAuth(true));
        router.push('/music/main');
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message || 'Что-то пошло не так');
      }
    } finally {
      setIsLoading(false);
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
          name="email"
          placeholder="Почта"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          className={classNames(styles.modal__input)}
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <div className={styles.errorContainer}>
          {error && <span className={styles.errorText}>{error}</span>}
        </div>
        <button
          disabled={isLoading}
          className={styles.modal__btnEnter}
          type="submit"
        >
          Войти
        </button>
        <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
          Зарегистрироваться
        </Link>
      </form>
    </>
  );
}
