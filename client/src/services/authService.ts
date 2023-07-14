import { PublicUser, UserCredentials, NewUserCredentials } from '@/types/types';
import { api } from './api';

export const login = async (creds: UserCredentials): Promise<PublicUser> => {
  const { data } = await api.post('/auth/login', creds);
  return data;
};

export const register = async (
  creds: NewUserCredentials,
): Promise<PublicUser> => {
  const { data } = await api.post('/auth/register', creds);
  return data;
};

export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};
