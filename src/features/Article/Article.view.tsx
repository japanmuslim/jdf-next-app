import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ArticleViewProps } from '@/features/Article/Article.type';
import { cn } from '@/lib/utils';
import ArticleCard from './components/ArticleCard';
import ArticleSkeleton from './components/ArticleSkeleton';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import { useEffect, useRef } from 'react';

const Carousel = dynamic(() => import('@/components/carousel'), {
  ssr: false,
  loading: () => <Loading />,
});

const ArticleView = ({
  categoryRef,
  articles,
  data,
  categories,
  carousel,
  currentCategory,
  isLoading,
  page = 1,
  onPaginate,
  onRedirect,
  onCategory,
  onSlideCategory,
}: ArticleViewProps) => {
  return (
    <>
      <Carousel id="carousel" data={carousel} />
      <div
        ref={categoryRef}
        className="lg:hidden sticky top-24 inset-x-0 overflow-auto !z-[99] bg-[#191919] lg:py-4 py-6 pl-10"
      >
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => onSlideCategory(0)}
            size="sm"
            variant="secondary"
            className={`!py-2 !px-4 !text-xs ${currentCategory === 0 ? 'bg-primary border-[#777a7b] border text-white hover:bg-primary' : ''}`}
          >
            Latest
          </Button>
          {categories?.map((item, index) => (
            <Button
              key={index}
              onClick={() => onSlideCategory(index + 1)}
              size="sm"
              variant="secondary"
              className={`!py-2 !px-4 !text-xs ${currentCategory === index + 1 ? 'bg-primary border-[#777a7b] border text-white hover:bg-primary' : ''}`}
            >
              {item?.name}
            </Button>
          ))}
        </div>
      </div>
      <section
        id="list-article"
        className="relative z-50 bg-[#191919] lg:pt-14 pt-4 pb-14 px-10 max-md:overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="hidden lg:block lg:w-1/4 relative">
            <div
              id="sticky-nav"
              className="py-8 px-6 rounded-2xl flex flex-col gap-4 border border-[#777A7B] lg:sticky lg:top-28"
            >
              <Button
                onClick={() => onCategory(0)}
                size="lg"
                variant="secondary"
                className={`${currentCategory === 0 ? 'bg-primary border-[#777a7b] border text-white hover:bg-primary' : ''}`}
              >
                Latest
              </Button>
              {categories?.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => onCategory(index + 1)}
                  size="lg"
                  variant="secondary"
                  className={`${currentCategory === index + 1 ? 'bg-primary border-[#777a7b] border text-white hover:bg-primary' : ''}`}
                >
                  {item?.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="lg:w-3/4">
            <h2 className="text-white text-lg font-semibold mb-4 lg:hidden block">
              List Article
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-4">
              {!articles || articles?.length <= 0 || isLoading
                ? [...Array(4)].map((_, index) => (
                    <ArticleSkeleton key={index} />
                  ))
                : articles?.map((article, index) => (
                    <ArticleCard
                      key={index}
                      article={article}
                      onRedirect={onRedirect}
                    />
                  ))}
            </div>

            <Pagination className="mt-10">
              <PaginationPrevious
                className={cn(
                  'cursor-pointer',
                  page === 1 && 'cursor-not-allowed',
                )}
                onClick={() => page > 1 && onPaginate(page - 1)}
              >
                Previous
              </PaginationPrevious>
              <PaginationContent>
                {[...Array(data?.last_page || 1)].map((_, index) => (
                  <PaginationItem
                    key={index}
                    onClick={() => onPaginate(index + 1)}
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
                  page === data?.last_page ? '!cursor-not-allowed' : ''
                }
                onClick={() =>
                  page < (data?.last_page || 1) && onPaginate(page + 1)
                }
              >
                Next
              </PaginationNext>
            </Pagination>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleView;
