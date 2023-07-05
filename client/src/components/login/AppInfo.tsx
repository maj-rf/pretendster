import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const AppInfo = () => {
  return (
    <Accordion type="single" collapsible className="p-8">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Pretendster?</AccordionTrigger>
        <AccordionContent>
          It is a full stack social media app inspired by Friendster.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
