import { Skeleton } from '../ui/skeleton';

export const SuggestionSkeleton = () => {
  return (
    <section className="md:sticky top-0 block space-y-3 col-span-9 md:col-span-3 p-4 bg-primary-foreground rounded-xl h-fit">
      <h1 className="text-center">Friend Suggestions</h1>
      <div className="flex gap-2 md:flex-col overflow-scroll scroll-list overflow-y-hidden p-1 md:p-0">
        <div className="flex items-center gap-2 p-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="flex-1 h-10 w-20" />
        </div>
        <div className="flex items-center gap-2 p-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="flex-1 h-10 w-20" />
        </div>
        <div className="flex items-center gap-2 p-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="flex-1 h-10" />
        </div>
        <div className="flex items-center gap-2 p-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="flex-1 h-10" />
        </div>
      </div>
    </section>
  );
};
