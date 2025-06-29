import axios from 'axios';
import { BASE_URL, RoutesApp } from '../constants';

type ApiError = {
  error?: string;
  message?: string;
  [key: string]: any;
};

// type authUserReturn = {
//   email: string;
//   username: string;
//   _id: number;
// };

export async function signIn(userData: { email: string; password: string }) {
  try {
    const data = await axios.post(`${BASE_URL}${RoutesApp.login}`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.data;
  } catch (e: any) {
    // если это AxiosError с response
    if (axios.isAxiosError(e) && e.response) {
      const apiErr = e.response.data as ApiError;
      // выбрасываем именно строку с ошибкой
      throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка входа');
    }
    // иначе неизвестная ошибка
    throw new Error(e.message);
  }
}

export async function signUp(userData: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const data = await axios.post(`${BASE_URL}${RoutesApp.sighup}`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data.data;
  } catch (e: any) {
    if (axios.isAxiosError(e) && e.response) {
      const apiErr = e.response.data as ApiError;
      throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка регистрации');
    }
    throw new Error(e.message);
  }
}
