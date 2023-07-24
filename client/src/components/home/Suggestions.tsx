import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { followUser, getUsers, unfollowUser } from '@/services/userService';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/button';

export const Suggestions = () => {
  const queryClient = useQueryClient();
  const { state } = useAuth();
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

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

  if (query.isLoading) return <div>Loading...</div>;
  if (!query.data) return <div>Invalid</div>;
  return (
    <section className="hidden md:block space-y-3 col-span-3 p-4 bg-secondary rounded-xl h-fit sticky top-0">
      <h1 className="text-center">Friend Suggestions</h1>
      {query.data.map((user) => {
        return (
          <div
            key={user.id}
            className="flex items-center hover:bg-primary-foreground p-1"
          >
            <Avatar className="h-10 w-10 border border-border ">
              <AvatarImage src={user.profileImg} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1 space-x-3">
              <Link
                className="text-sm font-medium leading-none"
                to={`/profile/${user.id}/${user.username}`}
              >
                {user.username}
              </Link>

              {user.followerIDs.includes(state.user?.id as string) ? (
                <Button onClick={() => unfollowMutation.mutate(user.id)}>
                  Unfollow
                </Button>
              ) : (
                <Button onClick={() => followMutation.mutate(user.id)}>
                  Follow
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};
