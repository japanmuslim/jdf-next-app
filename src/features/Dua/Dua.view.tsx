import React from 'react';
import { DuaViewProps } from './Dua.type';
import SearchDrawer from '@/components/search-drawer';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DM_Serif_Display } from 'next/font/google';
import { FaSearch } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import VideoListLoading from '@/components/video-list-loading';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
});

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

const Swiper = dynamic(() => import('@/components/ui/swiper'), {
  ssr: false,
  loading: () => <VideoListLoading />,
});

const DuaView = ({
  data,
  duaRef,
  filteredData,
  isCurrent,
  isCloseDrawer,
  onCurrent,
  onSearch,
  onPlay,
  onPause,
}: DuaViewProps) => (
  <>
    <section
      id="hero"
      ref={duaRef}
      className="min-h-screen flex items-center justify-center"
    >
      <SearchDrawer className="py-8" isOpen={isCloseDrawer}>
        <div className="mx-4 relative border border-gray-500 focus-within:border-white rounded-lg h-10">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full bg-transparent pl-8 text-white outline-none"
            onChange={onSearch}
          />
        </div>
        <h3 className="font-semibold text-lg mt-4 px-4">Dua List</h3>
        <div className="flex flex-col gap-0 mt-2 overflow-y-auto max-h-[78vh] custom-scrollbar pr-1">
          {(filteredData?.length ?? 0) > 0 &&
            filteredData?.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex flex-row hover:bg-gray-500 duration-300 transition-all cursor-pointer p-4 border-b border-gray-500',
                  isCurrent === index && 'bg-gray-500',
                )}
                onClick={() => onCurrent && onCurrent(index)}
              >
                <div className="relative w-36 h-20 rounded-lg overflow-hidden drop-shadow-lg">
                  <Image
                    src={item.thumbnail_url}
                    alt={item.name_dua}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col ml-4 justify-center gap-1">
                  <h3 className="font-semibold text-base">{item.name_dua}</h3>
                </div>
              </div>
            ))}
          {(filteredData?.length ?? 0) === 0 && (
            <div className="flex justify-center items-center h-20 text-white">
              No data found...
            </div>
          )}
        </div>
      </SearchDrawer>
      <VideoEmbed
        src={data[isCurrent || 0]?.link}
        // light={data[isCurrent || 0]?.thumbnail_url}
        onPlay={onPlay}
        onPause={onPause}
      />
    </section>
    <section
      id="latest-dua"
      className="bg-[#191919] py-12 space-y-8 lg:px-8 px-6 overflow-hidden"
    >
      <h2 className="font-bold text-2xl">Latest Dua</h2>
      <Swiper>
        {data?.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            id="cardSurah"
            className="relative overflow-hidden rounded-lg p-6 lg:h-64 md:h-64 h-48 cursor-pointer"
            onClick={() => onCurrent && onCurrent(index)}
          >
            <Image
              src={item.thumbnail_url}
              alt={item.name_dua}
              layout="fill"
              objectFit="cover"
              className="w-full h-full absolute inset-0 z-0"
            />
            <div
              className={cn(
                'text-center absolute -translate-x-1/2 -translate-y-1/2 bottom-0 left-1/2 z-10 w-full max-w-sm',
                dmSerifDisplay.className,
              )}
            >
              <h3 className="md:text-xl text-base">{item.name_dua}</h3>
            </div>
          </div>
        ))}
      </Swiper>
    </section>
  </>
);

export default DuaView;
