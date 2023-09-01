import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { IUser } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/services/userService';
import { UserPlus, UserMinus } from 'lucide-react';
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
    <article
      key={user.id}
      className="flex flex-col md:flex-row items-center justify-between hover:bg-primary-foreground p-1 border border-border md:border-0 rounded-md"
    >
      <div className="flex items-center gap-2">
        <Avatar className="lg:block h-10 w-10 border border-border ">
          <AvatarImage src={user.profileImg} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
        <Link
          className="text-sm leading-none hover:underline text-muted-foreground"
          to={`/profile/${user.id}/${user.username}`}
        >
          {user.username}
        </Link>
      </div>

      {user.followerIDs.includes(state.user?.id as string) ? (
        <Button
          onClick={() => unfollowMutation.mutate(user.id)}
          disabled={unfollowMutation.isLoading}
          size="sm"
          className="flex gap-1"
        >
          <UserMinus />
          <span className="hidden lg:block">
            {unfollowMutation.isLoading ? 'Unfollowing...' : 'Unfollow'}
          </span>
        </Button>
      ) : (
        <Button
          onClick={() => followMutation.mutate(user.id)}
          disabled={followMutation.isLoading}
          size="sm"
          className="flex gap-1"
        >
          <UserPlus />
          <span className="hidden lg:block">
            {followMutation.isLoading ? 'Following...' : 'Follow'}
          </span>
        </Button>
      )}
    </article>
  );
};
