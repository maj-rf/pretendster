import { IUser } from '@/types/types';
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar';
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

export const AvatarContainer = ({ data }: { data: IUser }) => {
  const [showPicModal, setShowPicModal] = useState(false);
  return (
    <div className="container mx-auto flex items-center justify-between absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2">
      <Dialog open={showPicModal} onOpenChange={setShowPicModal}>
        <div className="flex items-center relative">
          <DialogTrigger asChild>
            <Avatar className="w-28 h-auto">
              <AvatarImage
                src={data.profileImg}
                className="object-cover object-top"
              />
              <AvatarFallback>{data.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <div className="bg-secondary px-2 py-1 rounded-2xl translate-y-8 font-medium border-2 border-primary">
            {data.username}
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
