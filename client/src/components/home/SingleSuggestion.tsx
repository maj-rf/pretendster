import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link } from 'react-router-dom';
import { IUser } from '@/types/types';
export const SingleSuggestion = ({ user }: { user: IUser }) => {
  return (
    <article
      key={user.id}
      className="flex flex-col md:flex-row items-center justify-between hover:bg-primary-foreground p-1 border border-border md:border-0 rounded-md"
    >
      <Link
        className="w-full text-sm leading-none hover:underline text-muted-foreground"
        to={`/profile/${user.id}`}
      >
        <div className="flex items-center gap-2">
          <Avatar className="lg:block h-10 w-10 border border-border ">
            <AvatarImage
              src={user.profileImg}
              className="object-cover object-top"
            />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <p>{user.username}</p>
        </div>
      </Link>
    </article>
  );
};
