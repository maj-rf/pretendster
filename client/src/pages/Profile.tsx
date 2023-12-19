import { Outlet, useParams, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/userService';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';
import { TopBanner } from '@/components/profile/TopBanner';
import { AboutMe } from '@/components/profile/AboutMe';
import { cn } from '@/lib/utils';
export const Profile = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['profile', { id }],
    queryFn: () => getProfile(id as string),
  });

  if (isLoading) return <ProfileSkeleton />;
  if (!data) return <div>Invalid</div>;

  return (
    <section>
      <TopBanner data={data} />
      <div className="flex justify-center my-auto p-8">
        <div className="bg-accent py-1 px-2 rounded-lg shadow-md border-b-4 border-r-4">
          <NavLink
            to={`/profile/${data.id}`}
            end
            className={({ isActive }) =>
              cn(
                'px-2 py-1 h-full',
                isActive ? 'bg-primary text-white rounded-md' : undefined,
              )
            }
          >
            Posts
          </NavLink>
          <NavLink
            to={`/profile/${data.id}/followers`}
            className={({ isActive }) =>
              cn(
                'px-2 py-1 h-full',
                isActive ? 'bg-primary text-white rounded-md' : undefined,
              )
            }
          >
            Followers
          </NavLink>
          <NavLink
            to={`/profile/${data.id}/following`}
            className={({ isActive }) =>
              cn(
                'px-2 py-1 h-full',
                isActive ? 'bg-primary text-white rounded-md' : undefined,
              )
            }
          >
            Following
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 h-full max-w-5xl px-4 mx-auto relative gap-6">
        <AboutMe data={data} />
        <div className="col-span-full md:col-span-6 pb-4">
          <Outlet context={[data]} />
        </div>
      </div>
    </section>
  );
};
