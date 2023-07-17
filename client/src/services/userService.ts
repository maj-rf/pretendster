import { IUser, AboutMe } from '@/types/types';
import { api } from './api';

export const getProfile = async (id: string): Promise<IUser> => {
  const { data } = await api.get(`/users/profile/${id}`);
  return data;
};

export const updateAboutProfile = async (obj: {
  update: AboutMe;
  id: string;
}): Promise<IUser> => {
  const { data } = await api.patch(`users/profile/${obj.id}`, obj.update);
  return data;
};
