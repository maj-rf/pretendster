import { useQuery } from '@tanstack/react-query';
import { Comments } from '../comments/Comments';
import { Post } from '../posts/Post';
import { getAllPosts } from '@/services/postService';
import { CommentForm } from '../comments/CommentForm';

/**
 * TODO: Fetch Timeline posts and replace current posts
 */

export const TimeLinePosts = () => {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (!query.data) return <div>Invalid</div>;

  return (
    <div className="w-full mt-4 space-y-4">
      {query.data.map((post) => {
        return (
          <Post key={post.id} post={post}>
            <div className="p-6 bg-secondary text-muted-foreground transition-all duration-300">
              <Comments postId={post.id} />
              <CommentForm postId={post.id} />
            </div>
          </Post>
        );
      })}
    </div>
  );
};
