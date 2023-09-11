import { IUser } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Camera } from 'lucide-react';

export const TopBanner = ({ data }: { data: IUser }) => {
  const { state } = useAuth();
  return (
    <div className="relative z-10">
      <img
        src={data.bannerImg}
        alt={data.username + 'background'}
        className="w-full h-40 object-cover aspect-video object-center"
      />
      <div className="container mx-auto flex items-center justify-between absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2">
        <div className="flex items-center relative">
          <Avatar className="w-28 h-auto">
            <AvatarImage src={data.profileImg} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="bg-secondary px-2 py-1 rounded-2xl translate-y-8 font-medium">
            {data.username}
          </div>
        </div>
        {state?.user?.id === data.id ? (
          <Button className="space-x-1">
            <Camera />
            <span className="hidden md:block">Change Banner</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
};
