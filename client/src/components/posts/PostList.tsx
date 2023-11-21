import { IPost } from '@/types/types';
import { Comments } from '../comments/Comments';
import { Post } from '../posts/Post';
import { CommentForm } from '../comments/CommentForm';

export const PostList = ({ data }: { data: IPost[] }) => {
  if (data.length === 0)
    return (
      <div className="text-center text-primary">
        No posts. Please create a post or follow someone.
      </div>
    );
  return (
    <>
      {data.map((post) => {
        return (
          <Post key={post.id} post={post}>
            <div className="p-3">
              <Comments postId={post.id} />
              <CommentForm postId={post.id} />
            </div>
          </Post>
        );
      })}
    </>
  );
};
