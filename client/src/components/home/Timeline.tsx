import { PostForm } from './PostForm';
import { TimeLinePosts } from './TimelinePosts';

export const Timeline = () => {
  return (
    <section className="col-span-6 w-full h-[90vh] my-auto grid p-6 overflow-y-scroll scroll-list snap-y md:snap-none">
      <PostForm />
      <TimeLinePosts />
    </section>
  );
};
