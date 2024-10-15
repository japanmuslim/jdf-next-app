import React, { memo } from 'react';
import { FaqState } from '../Question.type';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { isOdd } from '@/lib/helpers';

interface FaqAccordionProps {
  isLoading: boolean;
  data: FaqState[];
}

const FaqAccordion = ({ data, isLoading }: FaqAccordionProps) => (
  <>
    {isLoading && (
      <div className="flex flex-col gap-4">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-16 bg-[#777A7B] rounded-none" />
        ))}
      </div>
    )}
    {data?.length === 0 && <h2 className="text-lg">No FAQs found.</h2>}
    {data?.length > 0 && (
      <div className="flex flex-col gap-2 rounded-r-lg overflow-hidden">
        {data?.map((faq, index) => (
          <Accordion
            key={index}
            type="single"
            data-aos={isOdd(index) ? 'fade-right' : 'fade-left'}
            collapsible
          >
            <AccordionItem value={`item-${faq.id}`} className="!border-b-0">
              <AccordionTrigger className="md:py-5 py-4 md:px-8 px-4 bg-primary/60 hover:!no-underline hover:!bg-[#191919] duration-500 transition-all">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="md:py-5 py-4 md:px-8 px-4 bg-[#191919] border-t border-[#777A7B]">
                {faq.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    )}
  </>
);

export default memo(FaqAccordion);
