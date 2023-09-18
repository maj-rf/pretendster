import { IPost } from '@/types/types';
import { Comments } from '../comments/Comments';
import { Post } from '../posts/Post';
import { CommentForm } from '../comments/CommentForm';

export const PostList = ({ data }: { data: IPost[] }) => {
  return (
    <>
      {data.map((post) => {
        return (
          <Post key={post.id} post={post}>
            <div className="p-3 bg-secondary text-muted-foreground transition-all duration-300">
              <Comments postId={post.id} />
              <CommentForm postId={post.id} />
            </div>
          </Post>
        );
      })}
    </>
  );
};
