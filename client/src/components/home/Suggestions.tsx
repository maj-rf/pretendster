import { useQuery } from '@tanstack/react-query';
import { getSuggestions } from '@/services/userService';
import { SingleSuggestion } from './SingleSuggestion';
import { Skeleton } from '../ui/skeleton';

const SuggestionSkeleton = () => {
  return (
    <section className="md:sticky top-0 block space-y-3 border col-span-9 md:col-span-3 p-4 bg-card rounded-xl h-fit">
      <h1 className="text-center border-b font-semibold">New App Users</h1>
      <div className="flex gap-2 md:block overflow-scroll scroll-list overflow-y-hidden p-1 md:p-0">
        <div className="flex flex-col md:flex-row items-center gap-2 p-1 w-20 sm:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 md:h-10 w-full" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 p-1 w-20 sm:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 md:h-10 w-full" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 p-1 w-20 sm:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 md:h-10 w-full" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 p-1 w-20 sm:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 md:h-10 w-full" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 p-1 w-20 sm:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 md:h-10 w-full" />
        </div>
      </div>
    </section>
  );
};

export const Suggestions = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getSuggestions,
  });

  if (query.isLoading) return <SuggestionSkeleton />;
  if (!query.data) return <div>Invalid</div>;
  return (
    <section className="md:sticky top-2 block space-y-3 col-span-9 md:col-span-3 p-4 border rounded-xl h-fit bg-card">
      <h1 className="text-center border-b font-semibold">New App Users</h1>

      <div className="flex gap-2 md:block overflow-scroll sm:no-scroll scroll-list overflow-y-hidden p-1 md:p-0">
        {query.data.map((user) => {
          return <SingleSuggestion key={user.id} user={user} />;
        })}
      </div>
    </section>
  );
};
