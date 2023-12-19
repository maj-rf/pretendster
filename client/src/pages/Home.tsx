import { Premium } from '@/components/home/Premium';
import { Suggestions } from '@/components/home/Suggestions';
import { Timeline } from '@/components/home/Timeline';

export const Home = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-9 h-full max-w-5xl mx-auto p-4 scroll-list relative gap-4">
      <div className="grid md:sticky top-20 gap-4 col-span-9 md:col-span-3 h-fit overflow-y-scroll">
        <Premium />
        <Suggestions />
      </div>
      <Timeline />
    </section>
  );
};
