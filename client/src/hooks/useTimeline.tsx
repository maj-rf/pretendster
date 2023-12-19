import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/services/postService';

/**
 * Query Keys:
 * Timeline (all posts): ['posts']
 * Profile: ['profile', {id: userId}];
 * Profile Suggestions: ['profile', {type: 'suggestions'}]
 * Profile Posts: ['posts', {id: userId}]
 *
 */

export const useTimeline = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });
};
