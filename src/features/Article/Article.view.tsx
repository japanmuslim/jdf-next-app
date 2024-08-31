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
import Carousel from '@/components/carousel';
import ArticleCard from './components/ArticleCard';
import ArticleSkeleton from './components/ArticleSkeleton';

const ArticleView = ({
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
}: ArticleViewProps) => {
  return (
    <>
      <Carousel id="carousel" data={carousel} />
      <section
        id="list-article"
        className="relative z-50 bg-[#191919] py-14 px-10"
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
                className={`${currentCategory === 0 ? 'bg-primary border-[#777a7b] border text-white' : ''}`}
              >
                Latest
              </Button>
              {categories?.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => onCategory(index + 1)}
                  size="lg"
                  variant="secondary"
                  className={`${currentCategory === index + 1 ? 'bg-primary border-[#777a7b] border text-white' : ''}`}
                >
                  {item?.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="lg:w-3/4">
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
