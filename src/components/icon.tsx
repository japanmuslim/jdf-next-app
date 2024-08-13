import Image from 'next/image';
import React from 'react';

const Icon = () => (
  <div className="h-14 w-14 relative">
    <Image
      src="/assets/logo.png"
      alt="logo"
      width={100}
      height={100}
      className="w-full h-full"
    />
  </div>
);

export default Icon;
