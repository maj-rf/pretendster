import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/userService';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';
import { TopBanner } from '@/components/profile/TopBanner';
import { AboutMe } from '@/components/profile/AboutMe';
import { ProfilePosts } from '@/components/profile/ProfilePosts';

export const Profile = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id as string),
  });

  if (isLoading) return <ProfileSkeleton />;
  if (!data) return <div>Invalid</div>;

  return (
    <section>
      <TopBanner data={data} />
      <div className="grid grid-cols-1 md:grid-cols-9 container mx-auto h-[calc(100vh-14rem)] py-8 overflow-y-scroll scroll-list relative">
        <AboutMe data={data} />
        <ProfilePosts />
      </div>
    </section>
  );
};
