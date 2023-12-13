import { IPost } from '@/types/types';
import { Comments } from '../comments/Comments';
import { Post } from '../posts/Post';
import { CommentForm } from '../comments/CommentForm';
import { MessageSquareDashed } from 'lucide-react';

export const PostList = ({ data }: { data: IPost[] }) => {
  if (data.length === 0)
    return (
      <section className="text-center text-primary h-[50vh] flex items-center justify-center">
        <div className="flex items-center justify-center gap-2 text-lg font-bold">
          <MessageSquareDashed size={50} />
          <span>No posts. Please create a post or follow someone.</span>
        </div>
      </section>
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
