import React, { memo } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { cn } from '@/lib/utils';

interface PaginateProps {
  className?: string;
  page: number;
  lastPage: number;
  onChange: (page: number) => void;
}

const Paginate = ({
  className = 'mt-10',
  page,
  lastPage,
  onChange,
}: PaginateProps) => (
  <Pagination className={className}>
    <PaginationPrevious
      className={cn('cursor-pointer', page === 1 && 'cursor-not-allowed')}
      onClick={() => page > 1 && onChange(page - 1)}
    >
      前へ
    </PaginationPrevious>
    <PaginationContent>
      {[...Array(lastPage || 1)].map((_, index) => (
        <PaginationItem
          key={index}
          onClick={() => onChange(index + 1)}
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
      className={page === lastPage ? '!cursor-not-allowed' : 'cursor-pointer'}
      onClick={() => page < (lastPage || 1) && onChange(page + 1)}
    >
      次へ
    </PaginationNext>
  </Pagination>
);

export default memo(Paginate);
