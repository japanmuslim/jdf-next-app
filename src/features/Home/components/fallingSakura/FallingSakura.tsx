import { useEffect, useState } from 'react';

export default function FallingSakura() {
  const sakuraCount = 100;
  const sakuraArray = Array.from(
    { length: sakuraCount },
    (_, index) => index + 1,
  );

  return (
    <div
      className="sakuraContainer absolute pointer-events-none z-50 w-screen h-screen"
      style={{ top: '-100px' }}
    >
      {sakuraArray.map((index) => {
        return <span key={index} />;
      })}
    </div>
  );
}
