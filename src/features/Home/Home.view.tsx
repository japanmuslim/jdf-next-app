import { memo } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import Link from 'next/link';

// const Button = ({ onClick, label }: { onClick: () => void; label: string }) => (
//   <button
//     type="button"
//     className="text-white font-extrabold text-3xl text-center w-40 duration-300 hover:scale-125"
//     onClick={onClick}
//   >
//     {label}
//   </button>
// );

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

const HomeView = () => (
  <section className="flex items-center justify-center min-h-screen w-full relative">
    <div className="absolute -translate-y-1/2 -translate-x-1/2 top-[43%] left-1/2 flex justify-around w-[100%] z-50 px-10">
      <Link
        href="/muslim"
        className="text-white font-extrabold text-3xl text-center w-40 duration-300 hover:scale-125"
      >
        ムスリム
      </Link>
      <Link
        href="/non-muslim"
        className="text-white font-extrabold text-3xl text-center w-40 duration-300 hover:scale-125"
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

export default memo(HomeView);
