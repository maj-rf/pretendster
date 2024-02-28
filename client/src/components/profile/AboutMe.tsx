/* eslint-disable quotes */
import { useAuth } from '@/hooks/useAuth';
import { IUser } from '@/types/types';
import { Map, Heart, Users, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog';
import { EditFormModal } from './EditFormModal';
import { useState } from 'react';
export const AboutMe = ({ data }: { data: IUser }) => {
  const { state } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const followers =
    data.followerIDs.length === 1
      ? '1 person'
      : `${data.followerIDs.length} people`;
  const following =
    data.followingIDs.length === 1
      ? '1 person'
      : `${data.followingIDs.length} people`;

  return (
    <div className="col-span-full md:col-span-3 border rounded-md p-4 h-fit relative md:sticky md:top-20 space-y-4 bg-card">
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <h1 className="text-2xl font-bold">About Me</h1>
        <div className="flex items-center gap-1">
          <Map className="text-green-400 fill-white" />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
            {data.location ?? 'Nowhere'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="text-red-200 fill-red-400" />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
            {data.status ?? "It's complicated"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="text-blue-400 fill-blue-200" />
          <div className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
            Followed by {followers}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Users className="text-blue-400 fill-blue-300" />
          <div className="text-ellipsis whitespace-nowrap overflow-hidden w-full">
            Follows {following}
          </div>
        </div>
        <div className="flex items-center justify-start gap-1 w-full">
          <p className="text-center font-semibold italic break-words overflow-hidden w-full">
            {data.bio ?? 'Be cheerful. Strive to be happy. -Desiderata'}
          </p>
        </div>
        {state?.user?.id === data.id ? (
          <DialogTrigger
            asChild
            className="absolute top-0 right-8 md:top-0 md:right-4"
          >
            {/* <Button onClick={() => setShowModal(true)} className="space-x-1"> */}
            <Button className="space-x-1">
              <Pencil />
              <span className="hidden lg:block">Edit Bio</span>
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User Details</DialogTitle>
            <DialogDescription>
              Change your bio to spice up profile!
            </DialogDescription>
          </DialogHeader>
          <EditFormModal
            user={data}
            closeModal={() => setShowEditProfile(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
