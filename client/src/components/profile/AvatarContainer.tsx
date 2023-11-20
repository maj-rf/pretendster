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
import { Plus, UserMinus, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { followUser, unfollowUser } from '@/services/userService';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Loading } from '../Loading';
import { GeneralAvatar } from '../common/GeneralAvatar';

export const AvatarContainer = ({ data }: { data: IUser }) => {
  const { state } = useAuth();
  const [showPicModal, setShowPicModal] = useState(false);
  const queryClient = useQueryClient();
  const follow = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['profile', { id: data.id }] });
      queryClient.invalidateQueries({
        queryKey: ['profile', { id: state.user?.id }],
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const unfollow = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['profile', { id: data.id }] });
      queryClient.invalidateQueries({
        queryKey: ['profile', { id: state.user?.id }],
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  return (
    <div className="container mx-auto flex items-center justify-between absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2">
      <Dialog open={showPicModal} onOpenChange={setShowPicModal}>
        <div className="flex items-center">
          <div className="group">
            <GeneralAvatar
              profileImg={data.profileImg}
              username={data.username}
              avatarClass="w-28 h-auto border-4 relative"
            >
              {state.user?.id === data.id ? (
                <DialogTrigger asChild>
                  <Button
                    className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                    variant="ghost"
                  >
                    <Plus className="w-full h-full" />
                  </Button>
                </DialogTrigger>
              ) : null}
            </GeneralAvatar>
          </div>

          <div className="flex items-center gap-4 translate-y-8">
            <div className="bg-accent px-2 py-1 rounded-2xl font-medium">
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
                    <span className="hidden lg:block">Unfollow</span>
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
                    <span className="hidden lg:block">Follow</span>
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
