import React, { memo } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

interface BreadcrumbProps {
  pageName: string;
}

const BreadcrumbComp = ({ pageName }: BreadcrumbProps) => (
  <Breadcrumb>
    <BreadcrumbList className="text-md">
      <BreadcrumbItem>
        <BreadcrumbLink className="text-white hover:text-[#777A7B]" href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="!text-white">{pageName}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

export default memo(BreadcrumbComp);
