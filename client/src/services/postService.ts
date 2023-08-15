import { IPost } from '@/types/types';
import { api } from './api';

export const createPost = async (obj: { content: string }) => {
  const { data } = await api.post('/posts/post', obj);
  return data;
};

export const getAllPosts = async (): Promise<IPost[]> => {
  const { data } = await api.get('/posts/all');
  return data;
};

export const deletePost = async (postId: string) => {
  const { data } = await api.delete(`/posts/post/${postId}`);
  return data;
};
