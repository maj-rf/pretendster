import { Suggestions } from '@/components/home/Suggestions';
import { Timeline } from '@/components/home/Timeline';

export const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 md:container mx-auto">
      <Suggestions />
      <Timeline />
    </div>
  );
};
