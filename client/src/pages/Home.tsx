import { Suggestions } from '@/components/home/Suggestions';
import { Timeline } from '@/components/home/Timeline';

export const Home = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-9 container mx-auto h-[calc(100vh-4rem)] py-8 overflow-y-scroll scroll-list relative gap-4">
      <Suggestions />
      <Timeline />
    </section>
  );
};
