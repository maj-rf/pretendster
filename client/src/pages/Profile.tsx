import { Button } from '@/components/ui/button';
import { AvatarImage, Avatar, AvatarFallback } from '../components/ui/avatar';
import { TimeLinePosts } from '@/components/home/TimelinePosts';
import { Map, Heart, Users } from 'lucide-react';
const user = {
  username: 'Rozeluxe',
  email: 'rozeluxe@gmail.com',
  profileImg: 'https://i.pravatar.cc/150?img=3',
  bgImg:
    'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000',
};

/** TODO
 *
 * Change Cover Photo should only be visibile if currentUser.id matches profileID
 *
 */

export const Profile = () => {
  return (
    <section>
      <div className="relative">
        <img
          src={user.bgImg}
          alt={user.username + 'background'}
          className="w-full h-48 object-cover object-center"
        />
        <div className="container mx-auto flex items-center justify-between absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2">
          <Avatar className="w-28 h-auto rounded-none">
            <AvatarImage src={user.profileImg} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <Button>Change Cover Photo</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 md:container mx-auto mt-8 h-[60vh] px-8 py-4 overflow-y-scroll scroll-list snap-y md:snap-none">
        <div className="col-span-2 bg-secondary rounded-md p-6 h-fit md:sticky md:top-0">
          <h1 className="text-2xl font-bold">About Me</h1>
          <div className="flex items-center">
            <Map className="mr-2 h-6 w-6" />
            <span>From Manila, Philippines</span>
          </div>
          <div className="flex items-center">
            <Heart className="mr-2 h-6 w-6" />
            <span>Single</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-6 w-6" />
            <span>Followed by 128 people</span>
          </div>
        </div>
        <div className="col-span-6 p-2 ">
          <h1 className="snap-start text-2xl font-bold">Your Posts</h1>
          <TimeLinePosts />
        </div>
      </div>
    </section>
  );
};
