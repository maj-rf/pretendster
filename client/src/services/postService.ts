import { api } from './api';

export const createPost = async (obj: { content: string }) => {
  const { data } = await api.post('/posts/post', obj);
  return data;
};

export const getAllPosts = async () => {
  const { data } = await api.get('/posts/all');
  return data;
};
