/* eslint-disable react/no-unescaped-entities */
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import { timeAgo } from '@/lib/helpers';
import React, { memo, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { MdOutlineWatchLater } from 'react-icons/md';
import { QuestionState } from '../Question.type';

interface DetailQuestionProps {
  data: QuestionState;
  isOpen?: boolean;
  isLoading?: boolean;
  onCloseModalAnswer: () => void;
}

// const Loading = (props: DetailQuestionProps) => (
//   <Modal
//     size="md"
//     title="Detail Question"
//     isOpen={props.isOpen || false}
//     onClose={props.onCloseModalAnswer}
//   >
//     <div className="flex justify-center items-center min-h-[40vh]">
//       <div className="flex gap-4 text-primary">
//         <FaSpinner className="animate-spin text-2xl" />
//         <p className="text-lg">Loading...</p>
//       </div>
//     </div>
//   </Modal>
// );

const DetailQuestion = (props: DetailQuestionProps) => {
  const { data, isLoading, isOpen, onCloseModalAnswer } = props;

  return (
    <Modal
      size="lg"
      title="Detail Question"
      isOpen={isOpen || false}
      onClose={onCloseModalAnswer}
      //   className="bg-[#191919] text-white border-[#191919]"
    >
      {!isLoading ? (
        <div className="flex flex-col text-primary md:py-8 py-6">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <Icon className="md:h-10 md:w-10 h-8 w-8" />
              <div>
                <h2 className="md:text-base text-sm font-semibold">
                  {data?.content}
                </h2>
                <div className="flex gap-3">
                  <h4 className="flex gap-1 items-center">
                    <MdOutlineWatchLater className="text-[#777A7B] text-md" />
                    <span className="text-[#777A7B] md:text-xs text-[10px]">
                      {timeAgo(data?.created_at as string)}
                    </span>
                  </h4>
                  <h4 className="flex gap-1 items-center text-xs">
                    <FaRegEye className="text-[#777A7B] text-md" />
                    <span className="text-[#777A7B] md:text-xs text-[10px]">
                      {data?.views}
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <p className="md:text-lg text-base">
            {data?.answer_question ? data?.answer_question : 'No answer yet...'}
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="flex gap-4 text-primary">
            <FaSpinner className="animate-spin text-2xl" />
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default memo(DetailQuestion);
