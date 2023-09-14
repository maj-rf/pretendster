import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/services/postService';
import { PostsSkeleton } from './PostsSkeleton';
import { PostList } from '../posts/PostList';

export const TimeLinePosts = () => {
  const query = useQuery({
    queryKey: ['posts'],
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
