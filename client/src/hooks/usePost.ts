import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updatePostLike, deletePost } from '@/services/postService';
// import { IPost } from '@/types/types';

export const usePost = () => {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: updatePostLike,
    // onSuccess: (data, id) => {
    // invalidate only the liked post and the profile post
    // queryClient.setQueryData(['posts'], (oldPosts: IPost[] | undefined) => {
    //   if (oldPosts) {
    //     return oldPosts.map((post) => {
    //       if (post.id === id) {
    //         post.likes = data.likes;
    //       }
    //       return post;
    //     });
    //   }
    //   return oldPosts;
    // });
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return { likeMutation, deleteMutation };
};
