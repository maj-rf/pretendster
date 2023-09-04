import { Skeleton } from '../ui/skeleton';

export const ProfileSkeleton = () => {
  return (
    <section>
      <Skeleton className="w-full h-40 object-cover aspect-video object-center" />
      <div className="grid grid-cols-1 md:grid-cols-9 container mx-auto h-[calc(100vh-14rem)] py-8 overflow-y-scroll scroll-list relative">
        <Skeleton className="col-span-3 bg-secondary rounded-md p-4 h-[22rem] relative md:sticky md:top-0 space-y-4"></Skeleton>
      </div>
    </section>
  );
};
