import { IUser } from '@/types/types';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { Camera } from 'lucide-react';
import { AvatarContainer } from './AvatarContainer';

export const TopBanner = ({ data }: { data: IUser }) => {
  const { state } = useAuth();
  return (
    <div className="relative z-10 h-40">
      <img
        src={data.bannerImg}
        alt={data.username + 'background'}
        className="w-full h-full object-cover aspect-video object-center"
      />
      <div className="absolute right-[1rem] top-[1rem]">
        {state?.user?.id === data.id ? (
          <Button className="space-x-1">
            <Camera />
            <span className="hidden md:block">Change Banner</span>
          </Button>
        ) : null}
      </div>
      <AvatarContainer data={data} />
    </div>
  );
};
