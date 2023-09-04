import { useQuery } from '@tanstack/react-query';
import { Comments } from '../comments/Comments';
import { Post } from '../posts/Post';
import { getAllPosts } from '@/services/postService';
import { CommentForm } from '../comments/CommentForm';
import { TimelinePostsSkeleton } from './TimelinePostsSkeleton';

/**
 * TODO: Figure out how to add postIds to queryKeys
 */

export const TimeLinePosts = () => {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

  if (query.isLoading) return <TimelinePostsSkeleton />;
  if (!query.data) return <div>Invalid</div>;

  return (
    <div className="w-full mt-4 space-y-4">
      {query.data.map((post) => {
        return (
          <Post key={post.id} post={post}>
            <div className="p-3 bg-secondary text-muted-foreground transition-all duration-300">
              <Comments postId={post.id} />
              <CommentForm postId={post.id} />
            </div>
          </Post>
        );
      })}
    </div>
  );
};
