import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ArticleSkeleton = ({ key }: { key: number }) => {
  return (
    <div key={key} className="flex flex-col gap-2">
      <Skeleton className="h-60 bg-primary" />
      <Skeleton className="h-8 bg-primary" />
      <Skeleton className="h-8 bg-primary" />
      <Skeleton className="h-8 bg-primary" />
    </div>
  );
};

export default ArticleSkeleton;
