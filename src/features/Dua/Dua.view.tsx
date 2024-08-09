import React, { FC, memo } from 'react'
import { DuaViewProps } from './Dua.type';
import SearchDrawer from '@/components/search-drawer';
import { Input } from '@/components/ui/input';
import ReactPlayer from 'react-player';
import Swiper from '@/components/ui/swiper';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DM_Serif_Display } from 'next/font/google';
import { FaSearch } from 'react-icons/fa';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: "400"
})

const DuaView: FC<DuaViewProps> = ({
  data,
  duaRef,
  filteredData,
  isCurrent,
  onCurrent,
  onSearch
}) => (
  <>
    <section
      id="hero"
      ref={duaRef}
      className="min-h-screen flex items-center justify-center"
    >
      <SearchDrawer className="py-8">
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
        <div className="flex flex-col gap-2 mt-2 overflow-y-auto max-h-[78vh] custom-scrollbar pr-1">
          {(filteredData?.length ?? 0) > 0 && filteredData?.map((item, index) => (
            <>
              <div
                key={index}
                className={cn(
                  "flex flex-row hover:bg-gray-500 duration-300 transition-all cursor-pointer p-4 border-b border-gray-500",
                  isCurrent === index && "bg-gray-500"
                )}
                onClick={() => onCurrent && onCurrent(index)}
              >
                <div
                  className="relative w-36 h-20 rounded-lg overflow-hidden drop-shadow-lg"
                >
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
            </>
          ))}
          {(filteredData?.length ?? 0) === 0 && (
            <div className="flex justify-center items-center h-20 text-white">
              No data found...
            </div>
          )}
        </div>
      </SearchDrawer>
      <div
        className="relative min-h-screen w-full overflow-hidden"
      >
        <ReactPlayer
          url={data[isCurrent || 0]?.link}
          style={{ position: 'absolute', top: 0, left: 0 }}
          width="100%"
          height="100%"
          loop
          playing
          controls
          light={data[isCurrent || 0]?.thumbnail_url}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1, // Enable auto-play
                modestbranding: 0,
                fs: 0, // Hide full-screen button
                rel: 0, // Avoid related videos
                showinfo: 0,// Hide video info (deprecated)
              }
            }
          }}
        />
      </div>
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
            id="cardSurah"
            className="relative overflow-hidden rounded-lg p-6 h-64 cursor-pointer"
            onClick={() => onCurrent && onCurrent(index)}
          >
            <Image
              src={item.thumbnail_url}
              alt={item.name_dua}
              layout="fill"
              objectFit="cover"
              className="w-full h-full absolute inset-0 z-0"
            />
            <div className={cn(
              "text-center absolute -translate-x-1/2 -translate-y-1/2 bottom-0 left-1/2 z-10 w-full max-w-sm",
              dmSerifDisplay.className
            )}
            >
              <h3 className="text-xl">{item.name_dua}</h3>
            </div>
          </div>
        ))}
      </Swiper>
    </section>
  </>
);

export default memo(DuaView)