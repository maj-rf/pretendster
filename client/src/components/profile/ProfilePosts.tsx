import { TimeLinePosts } from '../home/TimelinePosts';

export const ProfilePosts = () => {
  return (
    <div className="col-span-6 md:px-6 py-2">
      <h1 className="text-2xl font-bold">Your Posts</h1>
      <TimeLinePosts />
    </div>
  );
};
