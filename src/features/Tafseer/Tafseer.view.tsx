import SearchDrawer from '@/components/search-drawer';
import Image from 'next/image';
import ReactPlayer from 'react-player';

import { cn } from '@/lib/utils';

import { DM_Serif_Display } from 'next/font/google';
import { TafseerViewProps } from './Tafseer.type';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import { Skeleton } from '@/components/ui/skeleton';
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

const TafseerView = ({
  latest,
  filteredData,
  isCurrentTafseer,
  isCurrentSurah,
  tafseerRef,
  isTab,
  isJuz,
  isCurrentJuz,
  isCloseDrawer,
  onSearch,
  onCurrentSurah,
  onCurrentTafseer,
  onTab,
  onCurrentJuz,
  onCurrentLatest,
  onPlay,
  onPause,
}: TafseerViewProps) => (
  <>
    <section
      id="hero"
      ref={tafseerRef}
      className="min-h-screen flex items-center justify-center"
    >
      <SearchDrawer className="py-8" isExtend isOpen={isCloseDrawer}>
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
      <VideoEmbed
        src={
          isTab === 'surah'
            ? (filteredData?.[isCurrentSurah || 0]?.tafsirs?.[
                isCurrentTafseer || 0
              ]?.link_youtube ?? '')
            : (isJuz?.[isCurrentJuz || 0]?.tafsirs?.[isCurrentTafseer || 0]
                ?.link_youtube ?? '')
        }
        // light={
        //   isTab === 'surah'
        //     ? (filteredData?.[isCurrentSurah || 0]?.tafsirs?.[
        //         isCurrentTafseer || 0
        //       ]?.thumbnail_url ?? '')
        //     : (isJuz?.[isCurrentJuz || 0]?.tafsirs?.[isCurrentTafseer || 0]
        //         ?.thumbnail_url ?? '')
        // }
        onPlay={onPlay}
        onPause={onPause}
      />
    </section>
    <section
      id="latest-tafseer"
      className="bg-[#191919] py-12 space-y-8 lg:px-8 px-6 overflow-hidden"
    >
      <h2 className="font-bold text-2xl">最新のタフスィール</h2>
      {(latest?.length || 0) > 0 ? (
        <Swiper>
          {latest?.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
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
      ) : (
        <div className="flex justify-center items-center h-20 text-white">
          No Tafseer found...
        </div>
      )}
    </section>
  </>
);

export default TafseerView;
