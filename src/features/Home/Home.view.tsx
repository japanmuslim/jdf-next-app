'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import Link from 'next/link';
import useHome from './hooks/useHome';
import Image from 'next/image';

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

const HomeView = () => {
  const { router, breakpoint } = useHome();

  // Mobile and tab view
  if (breakpoint === 'sm' || breakpoint === 'md') {
    return (
      <section
        className="grid grid-cols-1 min-h-screen w-full"
        style={{
          backgroundImage: 'url(/assets/images/home/bg-mobile.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="h-full w-full flex items-center justify-center group relative">
          <div
            className="relative h-72 w-72"
            onClick={() => router.push('/non-muslim')}
          >
            <Image
              src="/assets/images/home/button-non.jpeg"
              alt="Japan Dahwa Foundation"
              fill
              className="object-contain"
              priority
            />
            {/* <div className="absolute top-1/2 w-[73%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/assets/images/home/text-nonmuslim.png"
                alt="Non Muslim"
                width={700}
                height={300}
                quality={100}
                className="object-contain"
                priority
              />
            </div> */}
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center group relative">
          <div
            className="relative h-72 w-72"
            onClick={() => router.push('/muslim')}
          >
            <Image
              src="/assets/images/home/btn-muslim.jpeg"
              alt="Japan Dahwa Foundation"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* <div className="absolute top-1/2 w-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/assets/images/home/bg-down.jpeg"
                alt="Muslim"
                width={600}
                height={300}
                quality={100}
                className="object-contain"
                priority
              />
            </div> */}
        </div>
      </section>
    );
  }

  // Desktop View
  return (
    <section className="flex items-center justify-center min-h-screen w-screen h-screen relative overflow-hidden">
      <div className="absolute -translate-y-1/2 -translate-x-1/2 lg:top-[43%] md:top-[47%] top-[48%] left-1/2 flex justify-around w-[100%] z-50 lg:px-10 px-6">
        <Link
          href="/muslim"
          className="font-extrabold lg:text-3xl md:text-xl text-[8px] text-center w-40 duration-300 hover:scale-125 text-transparent"
        >
          ムスリム
        </Link>
        <Link
          href="/non-muslim"
          className="font-extrabold lg:text-3xl md:text-xl text-[8px] text-center w-40 duration-300 hover:scale-125 text-transparent"
        >
          非ムスリム
        </Link>
      </div>
      <VideoEmbed
        src="/assets/videos/home/section.mp4"
        muted={true}
        controls={false}
      />
    </section>
  );
};

export default memo(HomeView);
