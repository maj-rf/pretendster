import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/services/postService';
import { PostsSkeleton } from './PostsSkeleton';
import { PostList } from '../posts/PostList';
import { useAuth } from '@/hooks/useAuth';

export const TimeLinePosts = () => {
  const { state } = useAuth();
  const query = useQuery({
    queryKey: ['posts', { id: state.user?.id }],
    queryFn: getAllPosts,
  });

  if (query.isLoading) return <PostsSkeleton />;
  if (!query.data) return <div>Invalid</div>;

  return (
    <div className="w-full mt-4 space-y-4">
      <PostList data={query.data} />
    </div>
  );
};
