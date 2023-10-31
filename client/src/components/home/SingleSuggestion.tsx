import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link } from 'react-router-dom';
import { PublicUser } from '@/types/types';
export const SingleSuggestion = ({ user }: { user: PublicUser }) => {
  return (
    <article
      key={user.id}
      className="flex flex-col md:flex-row items-center justify-between hover:bg-primary-foreground p-1  rounded-md"
    >
      <Link
        className="w-full leading-none hover:underline text-muted-foreground"
        to={`/profile/${user.id}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Avatar className="lg:block h-10 w-10 ">
            <AvatarImage
              src={user.profileImg}
              className="object-cover object-top"
            />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <p className="text-xs md:text-sm">{user.username}</p>
        </div>
      </Link>
    </article>
  );
};
