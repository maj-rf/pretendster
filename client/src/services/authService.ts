import { api } from './api';

type UserCredentials = {
  email: string;
  password: string;
};

type NewUserCredentials = {
  username: string;
  email: string;
  password: string;
  passConfirm: string;
};

export const login = async (creds: UserCredentials) => {
  const { data } = await api.post('/auth/login', creds);
  return data;
};

export const register = async (creds: NewUserCredentials) => {
  const { data } = await api.post('/auth/register', creds);
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};
