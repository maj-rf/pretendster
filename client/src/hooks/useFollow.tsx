import { useQueryClient, useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/services/userService';
export const useFollow = (
  currentUserId: string | undefined,
  receiverId: string,
) => {
  const queryClient = useQueryClient();
  const follow = useMutation({
    mutationFn: followUser,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['profile', { id: receiverId }],
        }),
        queryClient.invalidateQueries({
          queryKey: ['profile', { id: currentUserId }],
        }),
        queryClient.invalidateQueries({
          queryKey: ['posts'],
        }),
      ]),
  });

  const unfollow = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['profile', { id: receiverId }],
        }),
        queryClient.invalidateQueries({
          queryKey: ['profile', { id: currentUserId }],
        }),
        queryClient.invalidateQueries({
          queryKey: ['posts'],
        }),
      ]),
  });

  return { follow, unfollow };
};
