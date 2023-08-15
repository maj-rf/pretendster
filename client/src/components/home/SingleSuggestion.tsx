import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { IUser } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/services/userService';

export const SingleSuggestion = ({ user }: { user: IUser }) => {
  const { state } = useAuth();
  const queryClient = useQueryClient();
  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  return (
    <div
      key={user.id}
      className="flex items-center justify-between hover:bg-primary-foreground p-1"
    >
      <div className="flex items-center gap-2">
        <Avatar className="hidden lg:block h-10 w-10 border border-border ">
          <AvatarImage src={user.profileImg} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
        <Link
          className="text-sm font-medium leading-none hover:underline text-muted-foreground"
          to={`/profile/${user.id}/${user.username}`}
        >
          {user.username}
        </Link>
      </div>

      {user.followerIDs.includes(state.user?.id as string) ? (
        <Button
          onClick={() => unfollowMutation.mutate(user.id)}
          disabled={unfollowMutation.isLoading}
        >
          {unfollowMutation.isLoading ? 'Unfollowing...' : 'Unfollow'}
        </Button>
      ) : (
        <Button
          onClick={() => followMutation.mutate(user.id)}
          disabled={followMutation.isLoading}
        >
          {followMutation.isLoading ? 'Following...' : 'Follow'}
        </Button>
      )}
    </div>
  );
};
