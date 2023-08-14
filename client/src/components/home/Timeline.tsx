import { PostForm } from './PostForm';
import { TimeLinePosts } from './TimelinePosts';

export const Timeline = () => {
  return (
    <section className="col-span-6 w-full">
      <PostForm />
      <TimeLinePosts />
    </section>
  );
};
