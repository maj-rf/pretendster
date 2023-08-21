/* eslint-disable quotes */
import { Button } from '@/components/ui/button';
import { AvatarImage, Avatar, AvatarFallback } from '../components/ui/avatar';
import { TimeLinePosts } from '@/components/home/TimelinePosts';
import { Map, Heart, Users, Camera } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/userService';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { EditFormModal } from '@/components/profile/EditFormModal';
import { useAuth } from '@/hooks/useAuth';
/** TODO
 *
 * Change Cover Photo should only be visibile if currentUser.id matches profileID
 * Marquee the bio?
 */

export const Profile = () => {
  const { state } = useAuth();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id as string),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Invalid</div>;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <section>
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

        <div className="grid grid-cols-1 md:grid-cols-9 container mx-auto h-[calc(100vh-14rem)] py-8 overflow-y-scroll scroll-list relative">
          <div className="col-span-3 bg-secondary rounded-md p-4 h-fit relative md:sticky md:top-0 space-y-4">
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
              <span>Followed by {data.followerIDs.length} people</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-6 w-6" />
              <span>Follows {data.followingIDs.length} people</span>
            </div>
            <div className="flex items-center justify-start">
              <p className="bg-accent text-center font-semibold">
                {data.bio ?? 'Be cheerful. Strive to be happy. -Desiderata'}
              </p>
            </div>
            {/* <div className="marquee ">
              <ul className="marquee-content">
                <li>
                  {data.bio ?? 'Be cheerful. Strive to be happy. -Desiderata'}
                </li>
                <li>
                  {data.bio ?? 'Be cheerful. Strive to be happy. -Desiderata'}
                </li>
              </ul>
              <ul className=" marquee-content" aria-hidden="true">
                <li>
                  {data.bio ?? 'Be cheerful. Strive to be happy. -Desiderata'}
                </li>
                <li>
                  {data.bio ?? 'Be cheerful. Strive to be happy. -Desiderata'}
                </li>
              </ul>
            </div> */}
            {state?.user?.id === data.id ? (
              <DialogTrigger
                asChild
                className="absolute top-4 right-8 md:top-0 md:right-4"
              >
                <Button onClick={() => setShowModal(true)}>Edit</Button>
              </DialogTrigger>
            ) : null}
          </div>

          <div className="col-span-6 md:px-6 py-2">
            <h1 className="text-2xl font-bold">Your Posts</h1>
            <TimeLinePosts />
          </div>
        </div>
      </section>
      <EditFormModal closeModal={() => setShowModal(false)} user={data} />
    </Dialog>
  );
};
