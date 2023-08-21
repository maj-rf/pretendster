import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/userService';
import { SuggestionSkeleton } from './SuggestionSkeleton';
import { SingleSuggestion } from './SingleSuggestion';

export const Suggestions = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (query.isLoading) return <SuggestionSkeleton />;
  if (!query.data) return <div>Invalid</div>;
  return (
    <section className="md:sticky top-0 block space-y-3 col-span-9 md:col-span-3 p-4 bg-primary-foreground rounded-xl h-fit">
      <h1 className="text-center">Friend Suggestions</h1>
      <div className="flex md:block overflow-scroll scroll-list overflow-y-hidden">
        {query.data.map((user) => {
          return <SingleSuggestion key={user.id} user={user} />;
        })}
      </div>
    </section>
  );
};
