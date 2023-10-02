import { IPost } from '@/types/types';
import { api } from './api';

export const createPost = async (obj: FormData) => {
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

export const updatePostLike = async (postId: string) => {
  const { data } = await api.patch(`/posts/post/like/${postId}`);
  return data;
};

export const getYourPosts = async (userId: string): Promise<IPost[]> => {
  const { data } = await api.get(`/posts/all/${userId}`);
  return data;
};

export const updatePost = async (obj: { postId: string; content: string }) => {
  const { data } = await api.patch(`/posts/post/${obj.postId}`, obj);
  return data;
};
