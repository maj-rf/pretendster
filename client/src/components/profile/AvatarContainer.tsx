import { IUser } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';
import { useState } from 'react';
import { ChangeProfilePicModal } from './ChangeProfilePicModal';
import { Button } from '../ui/button';
import { UserMinus, UserPlus, Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '../Loading';
import { GeneralAvatar } from '../common/GeneralAvatar';
import { useFollow } from '@/hooks/useFollow';

export const AvatarContainer = ({ data }: { data: IUser }) => {
  const { state } = useAuth();
  const [showPicModal, setShowPicModal] = useState(false);
  const { follow, unfollow } = useFollow(state.user?.id, data.id);
  return (
    <div className="max-w-5xl flex items-center justify-between absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2">
      <Dialog open={showPicModal} onOpenChange={setShowPicModal}>
        <div className="flex items-center">
          <div className="relative">
            <GeneralAvatar
              profileImg={data.profileImg}
              username={data.username}
              avatarClass="w-28 h-28 border-4 relative"
            ></GeneralAvatar>
            {state.user?.id === data.id ? (
              <DialogTrigger asChild>
                <Button
                  className="absolute bottom-1 right-2 w-7 h-7 rounded-full text-white"
                  size="icon"
                  variant="default"
                >
                  <Camera />
                </Button>
              </DialogTrigger>
            ) : null}
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="bg-background text-foreground px-2 py-1 rounded-2xl font-medium">
              {data.username}
            </div>
            {data.id === state.user?.id ? null : data.followerIDs.includes(
                state.user?.id as string,
              ) ? (
              <Button
                onClick={() => unfollow.mutate(data.id)}
                disabled={unfollow.isLoading}
                size="sm"
                className="flex gap-1"
              >
                {unfollow.isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <UserMinus />
                    <span>Unfollow</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => follow.mutate(data.id)}
                disabled={follow.isLoading}
                size="sm"
                className="flex gap-1"
              >
                {follow.isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <UserPlus />
                    <span>Follow</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Your Profice Picture</DialogTitle>
            <DialogDescription>Get noticed!</DialogDescription>
          </DialogHeader>
          <ChangeProfilePicModal
            user={data}
            closeModal={() => setShowPicModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
