import { IUser } from '@/types/types';
import { api } from './api';

export const getProfile = async (id: string): Promise<IUser> => {
  const { data } = await api.get(`/users/profile/${id}`);
  return data;
};
