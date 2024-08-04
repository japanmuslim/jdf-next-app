import React, { FC, memo } from 'react'
import { DuaViewProps } from './Dua.type';
import SearchDrawer from '@/components/search-drawer';
import { Input } from '@/components/ui/input';
import ReactPlayer from 'react-player';
import Swiper from '@/components/ui/swiper';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DM_Serif_Display } from 'next/font/google';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: "400"
})

const DuaView: FC<DuaViewProps> = ({
  data,
  duaRef,
  isLoading,
  isCurrent,
  handleCurrent
}) => (
  <>
    <section
      id="hero"
      ref={duaRef}
      className="min-h-screen flex items-center justify-center lg:px-8 px-6"
    >
      <SearchDrawer>
        <Input
          type="text"
          placeholder="Search"
          className="w-full bg-primary text-background"
        />
      </SearchDrawer>
      <div
        className="relative z-40 overflow-hidden rounded-[25px] w-full lg:max-w-4xl md:max-w-3xl max-w-sm h-[75vh] flex items-center justify-center mt-16"
      >
        <ReactPlayer
          url={data[isCurrent || 0]?.link}
          style={{ position: 'absolute', top: 0, left: 0 }}
          videoStyleObjectFit={'cover'}
          width="100%"
          height="100%"
          controls={true}
          playing={true}
          light={data[isCurrent || 0]?.thumbnail_url}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                fs: 0,
                rel: 0,
                showinfo: 0
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
            onClick={() => handleCurrent && handleCurrent(index)}
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