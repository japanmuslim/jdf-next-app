import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { FaqState } from '@/features/Faq/Faq.type';
import Layout from '@/layouts/Layout';
import { cn } from '@/lib/utils';
import { useGetFaqQuery } from '@/services/api/faqService';
import React, { useCallback, useState } from 'react';

const Faq = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetFaqQuery(page);

  const faqs: FaqState[] = data?.data?.data;
  const lastPage = data?.data?.last_page;

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  return (
    <Layout id="faq" pageTitle="FAQ" pageDescription="FAQ page">
      <header
        id="hero"
        className="lg:min-h-[50vh] md:min-h-[30vh] min-h-[50vh] flex justify-center items-center"
      >
        <div className="relative z-10 w-full md:max-w-[600px] max-w-xs lg:pt-8 md:pt-14 pt-20">
          <h2 className="md:text-4xl text-2xl font-bold text-center text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-white mt-3 md:text-lg text-md">
            We are here to help you.
          </p>
        </div>
      </header>
      <nav className="lg:h-24 md:h-20 h-16 bg-primary flex justify-between items-center lg:px-32 px-8">
        <Breadcrumb>
          <BreadcrumbList className="text-md">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-white hover:text-[#777A7B]"
                href="/"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="!text-white">
                Frequently Asked Questions
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <section className="lg:px-32 px-8 lg:py-20 py-10 w-full bg-[#191919] flex md:flex-row flex-col md:gap-8 gap-10">
        <div className="md:w-1/4 w-full md:-order-last order-last">
          <div className="flex flex-col">
            <div className="py-4 md:px-6 px-4 bg-primary">
              <h2 className="font-medium">Hot Topics</h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                Twitter Bootsrap 3.0 - tabs-left not working anymore?
              </h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                Changing the color on my tabbed left bootstrap3 tabs
              </h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                How to create tabs on the left in bootstrap.js v3.0.0?
              </h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                Bootstrap horizontal form with left floated side tabs
              </h2>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 w-full">
          {isLoading && (
            <div className="flex flex-col gap-4">
              {[...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-16 bg-[#777A7B] rounded-none"
                />
              ))}
            </div>
          )}
          {faqs?.length === 0 && <h2 className="text-lg">No FAQs found.</h2>}
          {faqs?.length > 0 && (
            <div className="flex flex-col gap-2 rounded-r-lg overflow-hidden">
              {faqs?.map((faq) => (
                <Accordion key={faq.id} type="single" collapsible>
                  <AccordionItem
                    value={`item-${faq.id}`}
                    className="!border-b-0"
                  >
                    <AccordionTrigger className="md:py-5 py-4 md:px-8 px-4 bg-primary">
                      {faq.title}
                    </AccordionTrigger>
                    <AccordionContent className="md:py-5 py-4 md:px-8 px-4 bg-primary border-t">
                      {faq.description}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          )}

          <Pagination className="mt-10">
            <PaginationPrevious
              className={cn(
                'cursor-pointer',
                page === 1 && 'cursor-not-allowed',
              )}
              onClick={() => page > 1 && handlePageChange(page - 1)}
            >
              Previous
            </PaginationPrevious>
            <PaginationContent>
              {[...Array(lastPage || 1)].map((_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={cn(
                    'cursor-pointer',
                    index + 1 === page && 'bg-white text-primary rounded',
                  )}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext
              className={
                page === lastPage ? '!cursor-not-allowed' : 'cursor-pointer'
              }
              onClick={() =>
                page < (lastPage || 1) && handlePageChange(page + 1)
              }
            >
              Next
            </PaginationNext>
          </Pagination>
        </div>
      </section>
    </Layout>
  );
};

export default Faq;
