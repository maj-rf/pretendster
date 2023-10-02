import { useQuery } from '@tanstack/react-query';
import { getSuggestions } from '@/services/userService';
import { SuggestionSkeleton } from './SuggestionSkeleton';
import { SingleSuggestion } from './SingleSuggestion';

export const Suggestions = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getSuggestions,
  });

  if (query.isLoading) return <SuggestionSkeleton />;
  if (!query.data) return <div>Invalid</div>;
  return (
    <section className="md:sticky top-0 block space-y-3 col-span-9 md:col-span-3 p-4 bg-primary-foreground rounded-xl h-fit">
      <h1 className="text-center">Friend Suggestions</h1>
      <div className="flex gap-2 md:block overflow-scroll scroll-list overflow-y-hidden p-1 md:p-0">
        {query.data.map((user) => {
          return <SingleSuggestion key={user.id} user={user} />;
        })}
      </div>
    </section>
  );
};
