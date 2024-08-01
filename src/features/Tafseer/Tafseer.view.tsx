import SearchDrawer from '@/components/search-drawer'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import YouTube from 'react-youtube'

import { cn } from '@/lib/utils'

import { DM_Serif_Display } from 'next/font/google'
import Swiper from '@/components/ui/swiper'

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: "400"
})

const TafseerView = () => {
    return (
        <>
            <section
                id="hero"
                className="min-h-screen flex items-center justify-center lg:px-8 px-6"
            >
                <SearchDrawer>
                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-primary text-background"
                    />
                </SearchDrawer>
                <div className="relative z-40 overflow-hidden rounded-[25px] w-full lg:max-w-5xl md:max-w-3xl max-w-sm h-[80vh] flex items-center justify-center mt-16 bg-primary">
                    <YouTube
                        videoId="nshdkoeu_fY"
                        className="absolute inset-0 w-full lg:max-w-5xl md:max-w-3xl max-w-sm h-[80vh]"
                        opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                                autoplay: 1
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
                    {[...Array(6)].map((_, i) => (
                        <Link key={i} href="#" id="cardSurah" className="relative overflow-hidden rounded-lg p-6 h-64">
                            <Image
                                src="/assets/images/tafseer/surah.jpg"
                                alt="Surah Al-Fatihah"
                                layout="fill"
                                objectFit="cover"
                                className="w-full h-full absolute inset-0 z-0"
                            />
                            <div className={cn(
                                "text-center absolute -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/2 z-10 w-full max-w-sm",
                                dmSerifDisplay.className
                            )}
                            >
                                <h3 className="text-xl">Surah Al-Fatihah</h3>
                                <p className="text-sm">Ayat 1 - 10</p>
                            </div>
                        </Link>
                    ))}
                </Swiper>
            </section>
        </>
    )
}

export default TafseerView