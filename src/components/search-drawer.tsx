import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { FaChevronRight, FaX } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

interface SearchDrawerProps {
  children?: React.ReactNode;
  className?: string;
  isExtend?: boolean;
  isOpen?: boolean;
}

const SearchDrawer: FC<SearchDrawerProps> = ({
  children,
  className,
  isExtend = false,
  isOpen,
}) => {
  const [openSheet, setOpenSheet] = useState(false);

  const handleOpenSheet = useCallback(() => {
    setOpenSheet((prev) => !prev);
    document.body.style.overflow = openSheet ? 'auto' : 'hidden';
  }, [openSheet]);

  useEffect(() => {
    if (isOpen) {
      setOpenSheet(false);
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={cn(
          'fixed top-28 rounded-full rounded-l-none bg-primary p-4 flex items-center gap-1 cursor-pointer transition-all duration-200 delay-100 ease-in-out hover:-translate-x-1 z-[999]',
          openSheet
            ? `${isExtend ? 'md:left-[600px] left-full' : 'md:left-[379px] left-[315px]'}`
            : '-left-2',
        )}
        onClick={handleOpenSheet}
      >
        {openSheet ? (
          <>
            <FaChevronRight className="text-gray-500 text-[8px] rotate-180" />
            <FaSearch className="text-white" />
          </>
        ) : (
          <>
            <FaSearch className="text-white" />
            <FaChevronRight className="text-gray-500 text-[8px]" />
          </>
        )}
      </button>
      {openSheet && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[997]"
          onClick={handleOpenSheet}
        ></div>
      )}
      <div
        className={cn(
          'fixed inset-0 h-full bg-primary shadow-md shadow-black transition-all duration-200 delay-100 ease-in-out transform z-[999]',
          openSheet ? 'translate-x-0' : '-translate-x-full',
          isExtend ? 'md:w-[600px] w-full' : 'md:w-96 w-80',
        )}
      >
        <div
          className={cn(
            className ? className : 'md:py-8 px-4',
            isExtend ? 'py-12' : '',
          )}
        >
          {isExtend && (
            <FaX
              className="absolute top-4 right-4 text-white cursor-pointer md:hidden"
              onClick={handleOpenSheet}
            />
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default memo(SearchDrawer);
