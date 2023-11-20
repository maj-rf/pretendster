import { IUser } from '@/types/types';
import { useOutletContext } from 'react-router-dom';
import { SingleSuggestion } from '../home/SingleSuggestion';
export const BaseFollow = ({ title }: { title: string }) => {
  const [data]: IUser[] = useOutletContext();
  const dataToShow = title === 'Followers' ? data.followers : data.follows;
  return (
    <div className="bg-secondary p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {dataToShow.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <ul className="grid grid-cols-2">
          {dataToShow.map((user) => {
            return (
              <li key={user.id}>
                <SingleSuggestion user={user} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
