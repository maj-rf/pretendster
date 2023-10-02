import { CreatePost } from './CreatePost';
import { TimeLinePosts } from './TimelinePosts';

export const Timeline = () => {
  return (
    <section className="col-span-9 md:col-span-6 w-full">
      <CreatePost />
      <TimeLinePosts />
    </section>
  );
};
