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
    <section className="hidden md:block space-y-3 col-span-3 p-4 bg-primary-foreground rounded-xl h-fit sticky top-0">
      <h1 className="text-center">Friend Suggestions</h1>
      {query.data.map((user) => {
        return <SingleSuggestion key={user.id} user={user} />;
      })}
    </section>
  );
};
