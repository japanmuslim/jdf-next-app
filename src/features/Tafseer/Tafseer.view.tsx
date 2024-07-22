import SearchDrawer from '@/components/search-drawer'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { DM_Serif_Display } from 'next/font/google'

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
            </section>
            <section
                id="latest-tafseer"
                className="bg-[#191919] py-12 space-y-8 lg:px-8 px-6"
            >
                <h2 className="font-bold text-2xl">Latest Tafseer</h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <Link key={i} href="#" id="cardSurah" className="relative overflow-hidden rounded-lg p-6 h-64">
                            <Image
                                src="/assets/images/tafseer/surah.jpg"
                                alt="Surah Al-Fatihah"
                                layout="fill"
                                objectFit="cover"
                                className="w-full h-full absolute inset-0 z-0"
                            />
                            <div className={cn(
                                "text-center absolute -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/2 z-10",
                                dmSerifDisplay.className
                            )}
                            >
                                <h3 className="text-xl">Surah Al-Fatihah</h3>
                                <p className="text-sm">Ayat 1 - 10</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

export default TafseerView