import React from 'react';

const Loading = () => {
  return (
    <main className="min-h-screen w-full bg-primary">
      <div className="flex items-center justify-center h-screen">
        <div className="w-20 h-20 border-8 border-t-8 border-gray-200 rounded-full animate-spin"></div>
      </div>
    </main>
  );
};

export default Loading;
