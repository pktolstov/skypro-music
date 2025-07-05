import axios from 'axios';
import { BASE_URL, RoutesApp } from '../constants';

type ApiError = {
  error?: string;
  message?: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

type authUserProp = {
  email: string;
  password: string;
};

type accessTokenType = {
  access: string;
};
type refreshTokenType = {
  refresh: string;
};
type tokensType = accessTokenType & refreshTokenType;

export async function signIn(userData: authUserProp): Promise<authUserReturn> {
  try {
    const data = await axios.post(`${BASE_URL}${RoutesApp.login}`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка входа');
      }
      throw new Error(error.message);
    }
  }
  throw new Error();
}

export async function signUp(userData: {
  username: string;
  email: string;
  password: string;
}): Promise<authUserReturn> {
  try {
    const data = await axios.post(`${BASE_URL}${RoutesApp.sighup}`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(apiErr.error ?? apiErr.message ?? 'Ошибка входа');
      }
      throw new Error(error.message);
    }
  }
  throw new Error();
}

export const getTokens = (data: authUserProp): Promise<tokensType> => {
  return axios
    .post(`${BASE_URL}${RoutesApp.newToken}`, data)
    .then((res) => res.data);
};

export const refreshToken = (data: string): Promise<accessTokenType> => {
  return axios
    .post(`${BASE_URL}${RoutesApp.refreshToken}`, data)
    .then((res) => res.data);
};
