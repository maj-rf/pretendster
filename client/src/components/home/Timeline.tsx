import { PostForm } from './PostForm';
import { TimeLinePosts } from './TimelinePosts';

export const Timeline = () => {
  return (
    <section className="col-span-6 p-2 w-full h-[90vh] my-auto grid px-8 py-4 overflow-y-scroll">
      <PostForm />
      <TimeLinePosts />
    </section>
  );
};
