import React, { memo } from 'react';
import { QuestionState } from '../Question.type';
import { Skeleton } from '@/components/ui/skeleton';
import { isOdd, timeAgo } from '@/lib/helpers';
import Icon from '@/components/icon';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FaRegEye, FaSpinner } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { BsChatRightTextFill } from 'react-icons/bs';

const truncate = (str: string, num: number) => {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + '...';
};

interface QuestionListProps {
  data: QuestionState[];
  isLoading: boolean;
  isLoadingSearch: boolean;
  isLoadingButton: boolean;
  onHandleAnswer: (id: number) => void;
}

const QuestionList = ({
  data,
  isLoading,
  isLoadingButton,
  isLoadingSearch,
  onHandleAnswer,
}: QuestionListProps) => (
  <>
    {isLoading ||
      (isLoadingSearch && (
        <div className="flex flex-col gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-24 bg-[#777A7B]" />
          ))}
        </div>
      ))}
    {data?.length === 0 && (
      <h2 className="text-lg">No question and answer found...</h2>
    )}
    {data?.length > 0 && (
      <div className="flex flex-col gap-3">
        {data?.map((item: QuestionState, index) => (
          <div
            key={index}
            className="flex flex-col bg-primary/60 border-b border-gray-500 p-6 rounded-tr-xl"
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <Icon className="md:h-10 md:w-10 h-8 w-8" />
                <div>
                  <h2 className="md:text-base text-sm font-semibold">
                    {item?.content}
                  </h2>
                  <div className="flex gap-3">
                    <h4 className="flex gap-1 items-center">
                      <MdOutlineWatchLater className="text-[#777A7B] text-md" />
                      <span className="text-[#777A7B] md:text-xs text-[10px]">
                        {timeAgo(item?.created_at as string)}
                      </span>
                    </h4>
                    <h4 className="flex gap-1 items-center text-xs">
                      <FaRegEye className="text-[#777A7B] text-md" />
                      <span className="text-[#777A7B] md:text-xs text-[10px]">
                        {item?.views}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                className="bg-primary py-2 px-4 rounded hover:bg-[#191919] duration-300 relative flex-shrink-0 md:ml-4 ml-1"
                onClick={() => onHandleAnswer(item?.id)}
                disabled={isLoadingButton}
              >
                {!isLoadingButton ? (
                  <div className="flex items-center justify-center text-white gap-2 text-xs">
                    <BsChatRightTextFill className="md:text-md text-xs" />
                    <span>Answer</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-white gap-2 text-xs">
                    <FaSpinner className="animate-spin text-xs" />
                    <span>Loading...</span>
                  </div>
                )}
              </Button>
            </div>
            {item?.answers ? (
              <p className="text-white md:mt-4 mt-2">
                {truncate(item?.answers || '', 200)}
              </p>
            ) : (
              <p className="text-white md:mt-4 mt-2">No answer yet...</p>
            )}
          </div>
        ))}
      </div>
    )}
  </>
);

export default memo(QuestionList);
