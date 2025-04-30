import React, { memo } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useRouter } from 'next/router';

// interface BreadcrumbProps {
//   pageName: string;
// }

const BreadcrumbComp = () => {
  const router = useRouter();
  const pathSegments = router.pathname.split('/').filter((segment) => segment);
  const { slug } = router.query;

  const createBreadcrumbLabel = (segment: string) => {
    if (segment === '[slug]' && slug) {
      if (typeof slug === 'string') {
        return slug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
      } else if (Array.isArray(slug)) {
        return slug
          .join(' ')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
    }
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleBreacrumbTranslate = (segment: string) => {
    if (segment === 'q&a') {
      return 'よくある質問';
    }
    if (segment === 'article') {
      return '記事';
    }
    return segment;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-md">
        <BreadcrumbItem>
          <BreadcrumbLink className="text-[#777A7B] hover:text-[#777A7B]" href="/">
            ホーム
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathSegments.map((segment, index) => {
          const isLastSegment = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

          return (
            <BreadcrumbItem key={segment}>
              <BreadcrumbLink
                className="text-[#777A7B] hover:text-[#777A7B]"
                // className={`${
                //   isLastSegment ? 'text-white' : 'text-[#777A7B]'
                // } hover:text-[#777A7B]`}
                href={isLastSegment ? undefined : href}
              >
                {createBreadcrumbLabel(handleBreacrumbTranslate(segment))}
              </BreadcrumbLink>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default memo(BreadcrumbComp);
