import { IComment } from '@/types/types';
import { api } from './api';

export const getCommentsFromPost = async (
  postId: string,
): Promise<IComment[]> => {
  const { data } = await api.get(`comments/${postId}/all`);
  return data;
};

export const createCommentToPost = async (obj: {
  postId: string;
  content: string;
}) => {
  const { data } = await api.post(`comments/${obj.postId}`, obj);
  return data;
};
