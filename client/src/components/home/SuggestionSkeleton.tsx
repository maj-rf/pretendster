import { Skeleton } from '../ui/skeleton';

export const SuggestionSkeleton = () => {
  return (
    <section className="hidden md:block space-y-3 col-span-3 p-4 bg-primary-foreground rounded-xl h-fit sticky top-0">
      <h1 className="text-center">Friend Suggestions</h1>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="flex-1 h-10" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="flex-1 h-10" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="flex-1 h-10" />
      </div>
    </section>
  );
};
