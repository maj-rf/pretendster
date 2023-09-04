import { Skeleton } from '../ui/skeleton';

export const TimelinePostsSkeleton = () => {
  const arr: number[] = Array.from(Array(6).keys());
  return (
    <div>
      <div className="w-full mt-4 space-y-4">
        {arr.map((post) => {
          return <Skeleton key={post} className="w-full h-44" />;
        })}
      </div>
    </div>
  );
};
