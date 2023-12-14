import { PostsSkeleton } from './PostsSkeleton';
import { PostList } from '../posts/PostList';
// import { useAuth } from '@/hooks/useAuth';
import { useTimeline } from '@/hooks/useTimeline';

export const TimeLinePosts = () => {
  // const { state } = useAuth();
  const query = useTimeline();

  if (query.isLoading) return <PostsSkeleton />;
  if (!query.data) return <div>Invalid</div>;

  return (
    <div className="w-full mt-4 space-y-4">
      <PostList data={query.data} />
    </div>
  );
};
