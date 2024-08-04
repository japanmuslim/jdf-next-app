import SearchDrawer from '@/components/search-drawer'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import ReactPlayer from 'react-player'

import { cn } from '@/lib/utils'

import { DM_Serif_Display } from 'next/font/google'
import Swiper from '@/components/ui/swiper'
import { FC, memo } from 'react'
import { TafseerViewProps } from './Tafseer.type'

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: "400"
})

const TafseerView: FC<TafseerViewProps> = ({
    data,
    tafseerRef,
    isLoading,
    isCurrent,
    handleCurrent
}) => (
    <>
        <section
            id="hero"
            ref={tafseerRef}
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
                    url={data[isCurrent || 0]?.link_youtube}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={true} // Set to true to enable auto-play
                    light={data[isCurrent || 0]?.thumbnail_url}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 1, // Enable auto-play
                                modestbranding: 1,
                                fs: 0, // Hide full-screen button
                                rel: 0, // Avoid related videos
                                showinfo: 0 // Hide video info (deprecated)
                            }
                        }
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
                {data.map((item, index) => (
                    <div
                        key={index}
                        id="cardSurah"
                        className="relative overflow-hidden rounded-lg p-6 h-64 cursor-pointer"
                        onClick={() => handleCurrent && handleCurrent(index)}
                    >
                        <Image
                            src={item.thumbnail_url}
                            alt={item.name_tafseer}
                            layout="fill"
                            objectFit="cover"
                            className="w-full h-full absolute inset-0 z-0"
                        />
                        <div className={cn(
                            "text-center absolute -translate-x-1/2 -translate-y-1/2 bottom-0 left-1/2 z-10 w-full max-w-sm",
                            dmSerifDisplay.className
                        )}
                        >
                            <h3 className="text-xl">{item.name_tafseer}</h3>
                            <p className="text-sm">Ayat {item.start_surah} - {item.end_surah}</p>
                        </div>
                    </div>
                ))}
            </Swiper>
        </section>
    </>
);

export default memo(TafseerView);