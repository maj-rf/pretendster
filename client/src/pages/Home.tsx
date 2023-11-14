import { Suggestions } from '@/components/home/Suggestions';
import { Timeline } from '@/components/home/Timeline';

export const Home = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-9 h-full max-w-6xl mx-auto p-4 scroll-list relative gap-4">
      <Suggestions />
      <Timeline />
    </section>
  );
};
