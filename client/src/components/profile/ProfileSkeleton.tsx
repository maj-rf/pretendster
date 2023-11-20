import { Skeleton } from '../ui/skeleton';

export const ProfileSkeleton = () => {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="w-full h-40 object-cover aspect-video object-center" />
      {/* <Skeleton className="h-10 w-24 flex gap-8 justify-center mx-auto py-4" /> */}
      <div className="">
        <div className="flex flex-row justify-center mx-auto gap-2 w-full">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 container mx-auto h-[calc(100vh-14rem)] relative">
        <Skeleton className="col-span-3 bg-secondary rounded-md p-4 h-[22rem] relative md:sticky md:top-0 space-y-4"></Skeleton>
      </div>
    </section>
  );
};
