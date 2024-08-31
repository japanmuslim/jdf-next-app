import SearchDrawer from '@/components/search-drawer';
import Image from 'next/image';
import ReactPlayer from 'react-player';

import { cn } from '@/lib/utils';

import { DM_Serif_Display } from 'next/font/google';
import Swiper from '@/components/ui/swiper';
import { FC, memo } from 'react';
import { TafseerViewProps } from './Tafseer.type';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
});

const TafseerView: FC<TafseerViewProps> = ({
  data,
  latest,
  filteredData,
  isCurrentTafseer,
  isCurrentSurah,
  tafseerRef,
  isTab,
  isJuz,
  isCurrentJuz,
  onSearch,
  onCurrentSurah,
  onCurrentTafseer,
  onPlay,
  onPause,
  onTab,
  onCurrentJuz,
  onCurrentLatest,
}) => (
  <>
    <section
      id="hero"
      ref={tafseerRef}
      className="min-h-screen flex items-center justify-center"
    >
      <SearchDrawer className="py-8" isExtend>
        <div className="mx-4 relative border border-gray-500 focus-within:border-white rounded-lg h-10">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder={
              isTab === 'surah' ? 'Search Surah...' : 'Search Juz...'
            }
            className="w-full h-full bg-transparent pl-8 text-white outline-none"
            onChange={onSearch}
          />
        </div>
        <div className="flex items-center my-6 mx-4 gap-1">
          <Button
            size="lg"
            className={`rounded-full bg-[#191919] bg-opacity-60 hover:bg-[#191919] !py-0 ${isTab === 'surah' && 'bg-[#191919] bg-opacity-100'}`}
            onClick={() => onTab && onTab('surah')}
          >
            Surah
          </Button>
          <Button
            size="lg"
            className={`rounded-full bg-[#191919] bg-opacity-60 hover:bg-[#191919] !py-0 ${isTab === 'juz' && 'bg-[#191919] bg-opacity-100'}`}
            onClick={() => onTab && onTab('juz')}
          >
            Juz
          </Button>
        </div>
        {isTab === 'surah' && (
          <div className="flex flex-row flex-nowrap mt-4">
            <div>
              <h3 className="font-medium text-lg px-4">Surah</h3>
              <div className="flex flex-col gap-0 mt-2 overflow-y-auto max-h-[70vh] custom-scrollbar pr-2 md:w-60 w-fit">
                {(filteredData?.length || 0) > 0 &&
                  filteredData?.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex flex-row hover:bg-gray-500 duration-300 transition-all cursor-pointer p-4 border-b border-gray-500',
                        isCurrentSurah === index && 'bg-gray-500',
                      )}
                      onClick={() => onCurrentSurah && onCurrentSurah(index)}
                    >
                      <div className="flex flex-col justify-center gap-1">
                        <h3 className="font-medium md:text-[15px] text-xs">
                          Surah {item.surah_name}
                        </h3>
                      </div>
                    </div>
                  ))}
                {(filteredData?.length || 0) === 0 && (
                  <div className="flex justify-center items-center h-20 text-white">
                    No Surah found...
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col pl-4 pr-1 flex-1">
              <h3 className="font-medium text-lg">Tafseer</h3>
              {(filteredData?.[isCurrentSurah || 0]?.tafsirs?.length || 0) >
                0 && (
                <div className="flex flex-col gap-0 mt-2 overflow-y-auto max-h-[70vh] custom-scrollbar pr-2">
                  {(filteredData ?? [])[isCurrentSurah || 0]?.tafsirs?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex flex-row hover:bg-gray-500 duration-300 transition-all cursor-pointer p-4 border-b border-gray-500',
                          isCurrentTafseer === index && 'bg-gray-500',
                        )}
                        onClick={() =>
                          onCurrentTafseer && onCurrentTafseer(index)
                        }
                      >
                        <div className="relative md:min-w-36 md:min-h-20 min-w-20 min-h-14 rounded-lg overflow-hidden drop-shadow-lg">
                          <Image
                            src={item.thumbnail_url}
                            alt={item.name_tafseer}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col md:ml-4 ml-2 justify-center md:gap-1">
                          <h3 className="font-medium md:text-[15px] text-xs">
                            {item.name_tafseer}
                          </h3>
                          <p className="md:text-xs text-[10px]">
                            Verse {item.start_surah} - {item.end_surah}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {isTab === 'juz' && (
          <div className="flex flex-row flex-nowrap mt-4">
            <div>
              <h3 className="font-medium text-lg px-4">Juz</h3>
              <div className="flex flex-col gap-0 mt-2 overflow-y-auto max-h-[70vh] custom-scrollbar pr-2 md:w-60 w-fit">
                {(isJuz?.length || 0) > 0 &&
                  isJuz?.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex flex-row hover:bg-gray-500 duration-300 transition-all cursor-pointer p-4 border-b border-gray-500',
                        isCurrentJuz === index && 'bg-gray-500',
                      )}
                      onClick={() => onCurrentJuz && onCurrentJuz(index)}
                    >
                      <div className="flex flex-col justify-center gap-1">
                        <h3 className="font-medium md:text-[15px] text-xs">
                          Juz {item?.juz_number}
                        </h3>
                        <p className="md:text-xs text-[10px]">
                          Total Surah: {item?.total_surah}
                        </p>
                      </div>
                    </div>
                  ))}
                {(isJuz?.length || 0) === 0 && (
                  <div className="flex justify-center items-center h-20 text-white">
                    No Juz found...
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col pl-4 pr-1 flex-1">
              <h3 className="font-medium text-lg">Tafseer</h3>
              {(isJuz?.length || 0) > 0 && (
                <div className="flex flex-col gap-0 mt-2 overflow-y-auto max-h-[70vh] custom-scrollbar pr-2">
                  {(isJuz ?? [])[isCurrentJuz || 0]?.tafsirs?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex flex-row hover:bg-gray-500 duration-300 transition-all cursor-pointer p-4 border-b border-gray-500',
                          isCurrentTafseer === index && 'bg-gray-500',
                        )}
                        onClick={() =>
                          onCurrentTafseer && onCurrentTafseer(index)
                        }
                      >
                        <div className="relative md:min-w-36 md:min-h-20 min-w-20 min-h-14 rounded-lg overflow-hidden drop-shadow-lg">
                          <Image
                            src={item.thumbnail_url}
                            alt={item.name_tafseer}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col md:ml-4 ml-2 justify-center md:gap-1">
                          <h3 className="font-medium md:text-[15px] text-xs">
                            {item.name_tafseer}
                          </h3>
                          <p className="md:text-xs text-[10px]">
                            Verse {item.start_surah} - {item.end_surah}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </SearchDrawer>
      <div className="relative lg:min-h-screen md:min-h-screen min-h-[30vh] w-full overflow-hidden">
        <ReactPlayer
          url={
            isTab === 'surah'
              ? filteredData?.[isCurrentSurah || 0]?.tafsirs?.[
                  isCurrentTafseer || 0
                ]?.link_youtube
              : isJuz?.[isCurrentJuz || 0]?.tafsirs?.[isCurrentTafseer || 0]
                  ?.link_youtube
          }
          style={{ position: 'absolute', top: 0, left: 0 }}
          width="100%"
          height="100%"
          loop
          playing
          light={
            isTab === 'surah'
              ? filteredData?.[isCurrentSurah || 0]?.tafsirs?.[
                  isCurrentTafseer || 0
                ]?.thumbnail_url
              : isJuz?.[isCurrentJuz || 0]?.tafsirs?.[isCurrentTafseer || 0]
                  ?.thumbnail_url
          }
          onPlay={onPlay}
          onPause={onPause}
          controls
          config={{
            youtube: {
              playerVars: {
                autoplay: 1, // Enable auto-play
                modestbranding: 0,
                fs: 0, // Hide full-screen button
                rel: 0, // Avoid related videos
                showinfo: 0, // Hide video info (deprecated)
              },
            },
          }}
        />
      </div>
    </section>
    <section
      id="latest-tafseer"
      className="bg-[#191919] py-12 space-y-8 lg:px-8 px-6 overflow-hidden"
    >
      <h2 className="font-bold text-2xl">Latest Tafseer</h2>
      <Swiper>
        {latest?.map((item, index) => (
          <div
            key={index}
            id="cardSurah"
            className="relative overflow-hidden rounded-lg p-6 lg:h-64 md:h-64 h-48 cursor-pointer"
            onClick={() =>
              onCurrentLatest && onCurrentLatest(item?.surah_id, item?.id)
            }
          >
            <Image
              src={item.thumbnail_url}
              alt={item.name_tafseer}
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
              <h3 className="md:text-xl text-base">{item.name_tafseer}</h3>
              <p className="md:text-sm text-xs">
                Verse {item.start_surah} - {item.end_surah}
              </p>
            </div>
          </div>
        ))}
      </Swiper>
    </section>
  </>
);

export default memo(TafseerView);
