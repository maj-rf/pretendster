import { Skeleton } from '../ui/skeleton';

export const ProfileSkeleton = () => {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="w-full h-40 object-cover aspect-video object-center" />
      {/* <Skeleton className="h-10 w-24 flex gap-8 justify-center mx-auto py-4" /> */}
      <div className="">
        <div className="flex flex-row justify-center mx-auto gap-2 w-full p-4">
          <Skeleton className="h-10 w-[250px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 w-full max-w-6xl mx-auto px-4 h-[calc(100vh-14rem)] relative">
        <Skeleton className="col-span-full md:col-span-3 md:w-[350px] w-full bg-secondary rounded-md h-[20rem] relative md:sticky md:top-0 space-y-4"></Skeleton>
      </div>
    </section>
  );
};
