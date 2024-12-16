import { cn } from '@/lib/utils';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalPdfProps {
  isOpenBooks: {
    isOpen: boolean;
    url: string;
  };
  onHandleCloseBooks: () => void;
  containerPdf: React.RefObject<HTMLIFrameElement>;
}

const ModalPdf = ({
  isOpenBooks,
  containerPdf,
  onHandleCloseBooks,
}: ModalPdfProps) => {
  const { isOpen, url } = isOpenBooks;

  return (
    <div
      className={cn(
        'absolute inset-0 bg-black/80 w-full h-full top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex justify-center items-center z-[999] transition-all duration-300',
        isOpen && url ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl z-[999]"
        onClick={onHandleCloseBooks}
      >
        <FaTimes />
      </button>
      <div
        ref={containerPdf}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <iframe
          style={{
            position: 'absolute',
            border: 'none',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          }}
          src={url}
          seamless
          scrolling="no"
          frameBorder={0}
          // allowTransparency
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ModalPdf;
