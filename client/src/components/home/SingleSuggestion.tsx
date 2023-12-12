import { Link } from 'react-router-dom';
import { PublicUser } from '@/types/types';
import { GeneralAvatar } from '../common/GeneralAvatar';
export const SingleSuggestion = ({ user }: { user: PublicUser }) => {
  return (
    <article
      key={user.id}
      className="flex flex-col md:flex-row items-center justify-between p-1 rounded-md"
    >
      <Link
        className="w-full leading-none hover:underline text-muted-foreground"
        to={`/profile/${user.id}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-2 w-20 md:w-full">
          <GeneralAvatar
            username={user.username}
            profileImg={user.profileImg}
          />
          <p className="truncate w-full text-xs md:text-sm text-center md:text-left">
            {user.username}
          </p>
        </div>
      </Link>
    </article>
  );
};
