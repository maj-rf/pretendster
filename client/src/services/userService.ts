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
  const { data } = await api.patch(`/users/profile/${obj.id}`, obj.update);
  return data;
};

export const getUsers = async (): Promise<IUser[]> => {
  const { data } = await api.get('/users/all');
  return data;
};

export const followUser = async (userId: string): Promise<IUser> => {
  const { data } = await api.patch(`users/user/${userId}/follow`);
  return data;
};

export const unfollowUser = async (userId: string): Promise<IUser> => {
  const { data } = await api.patch(`users/user/${userId}/unfollow`);
  return data;
};

export const updateProfilePic = async (obj: {
  update: FormData;
  userId: string;
}): Promise<string> => {
  const { data } = await api.patch(
    `users/profile/${obj.userId}/picture`,
    obj.update,
  );
  return data;
};
