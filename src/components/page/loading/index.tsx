import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <main className="min-h-screen w-full bg-[#191919]">
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="w-16 h-16 text-primary animate-spin" />
      </div>
    </main>
  );
};

export default Loading;
