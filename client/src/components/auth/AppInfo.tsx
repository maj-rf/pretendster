import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const AppInfo = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="px-8 py-4 bg-white opacity-60 dark:bg-slate-800"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Pretendster?</AccordionTrigger>
        <AccordionContent>
          It is a full stack social media app inspired by Friendster.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How can I check the app?</AccordionTrigger>
        <AccordionContent>
          You can do a trial via Guest Login to try some of the features or
          register & login to fully experience the app.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
