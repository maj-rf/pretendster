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
    <div className="col-span-3 bg-secondary rounded-md p-4 h-fit relative md:sticky md:top-0 space-y-4">
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <h1 className="text-2xl font-bold">About Me</h1>
        <div className="flex items-center">
          <Map className="mr-2 h-6 w-6" />
          <span>{data.location ?? 'Nowhere'}</span>
        </div>
        <div className="flex items-center">
          <Heart className="mr-2 h-6 w-6" />
          <span>{data.status ?? "It's complicated"}</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-6 w-6" />
          <span>Followed by {followers}</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-6 w-6" />
          <span>Follows {following}</span>
        </div>
        <div className="flex items-center justify-start">
          <p className="bg-accent text-center font-semibold">
            {data.bio ?? 'Be cheerful. Strive to be happy. -Desiderata'}
          </p>
        </div>
        {state?.user?.id === data.id ? (
          <DialogTrigger
            asChild
            className="absolute top-4 right-8 md:top-0 md:right-4"
          >
            {/* <Button onClick={() => setShowModal(true)} className="space-x-1"> */}
            <Button className="space-x-1">
              <Pencil />
              <span className="hidden lg:block">Edit Profile</span>
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
