import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';

type UserAvatar = {
  profileImg: string;
  username: string;
  avatarClass?: string;
  imgClass?: string;
  children?: React.ReactNode;
};

export const GeneralAvatar = ({
  profileImg,
  username,
  avatarClass,
  imgClass,
  children,
}: UserAvatar) => {
  return (
    <Avatar className={cn('bg-secondary', avatarClass)}>
      <AvatarImage
        src={profileImg}
        alt={`${username}'s picture`}
        className={cn('object-fill', imgClass)}
      />
      <AvatarFallback className={cn('bg-secondary', avatarClass)}>
        {username.slice(0, 2)}
      </AvatarFallback>
      {children}
    </Avatar>
  );
};
