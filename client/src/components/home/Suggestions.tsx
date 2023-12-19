import { useQuery } from '@tanstack/react-query';
import { getSuggestions } from '@/services/userService';
import { SingleSuggestion } from './SingleSuggestion';
import { Skeleton } from '../ui/skeleton';
// import { useAuth } from '@/hooks/useAuth';

const SuggestionSkeleton = () => {
  return (
    <section className="border rounded-xl p-4 overflow-hidden bg-card">
      <h1 className="text-center border-b font-semibold">New App Users</h1>
      <div className="flex flex-row md:flex-col items-center gap-2 overflow-scroll sm:no-scroll scroll-list overflow-y-hidden py-2">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between rounded-md md:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 md:h-10 w-20 md:w-full" />
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between rounded-md md:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 md:h-10 w-20 md:w-full" />
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between rounded-md md:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 md:h-10 w-20 md:w-full" />
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between rounded-md md:w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 md:h-10 w-20 md:w-full" />
        </div>
      </div>
    </section>
  );
};

export const Suggestions = () => {
  // const { state } = useAuth();
  const query = useQuery({
    queryKey: ['profile', { type: 'suggestions' }],
    queryFn: getSuggestions,
  });

  if (query.isLoading) return <SuggestionSkeleton />;
  if (!query.data) return <div>Invalid</div>;
  return (
    <div className="border rounded-xl p-4 bg-card text-card-foreground overflow-hidden">
      <h1 className="text-center border-b font-semibold">New App Users</h1>
      <div className="flex flex-row md:flex-col gap-2 overflow-scroll overflow-y-hidden md:overflow-y-auto sm:no-scroll scroll-list py-2 h-fit md:h-[200px]">
        {query.data.map((user) => {
          return <SingleSuggestion key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};
