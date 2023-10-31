import { PublicUser } from '@/types/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { SingleSuggestion } from '../home/SingleSuggestion';

export const PopoverFollow = ({
  data,
  children,
}: {
  data: PublicUser[];
  children: React.ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        {data.length === 0 ? (
          <div>No users found.</div>
        ) : (
          <ul>
            {data.map((user) => {
              return (
                <li key={user.id}>
                  <SingleSuggestion user={user} />
                </li>
              );
            })}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};
