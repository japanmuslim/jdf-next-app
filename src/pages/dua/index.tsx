import Layout from "@/layouts/Layout";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import YouTube from "react-youtube";

export default function Dua() {
    return (
        <Layout
            id="dua"
            pageTitle="Dua"
            pageDescription="Dua page"
        >
            <section id="hero" className="min-h-screen overflow-hidden flex flex-col justify-center items-center py-24 lg:px-8 px-6">
                <Image
                    src="/assets/images/dua/globe.png"
                    alt="Dua"
                    width={800}
                    height={800}
                    priority
                    className="w-[600px] h-auto absolute z-0 top-20 lg:-right-20 md:-right-20 -right-40 opacity-20 transform rotate-12"
                />
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
                {/* <div className="grid grid-cols-2 overflow-hidden">
                    <div className="z-[1] flex flex-col items-center justify-center lg:ps-0 ps-6 lg:pt-0 pt-12 lg:mr-0 -mr-8">
                        <div className="relative bg-gray-300 rounded-full w-full lg:max-w-xs max-w-[220px] lg:h-10 h-10 px-6 overflow-hidden">
                            <input type="text" placeholder="Search dua" className="w-full h-full bg-transparent outline-none placeholder:text-gray-400 text-primary" />
                            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                        <div className="w-full lg:max-w-xs max-w-[220px] h-80 bg-[#191919] -mt-7 pt-10 rounded-3xl rounded-t-none pr-2 shadow-lg">
                            <div id="searchDua" className="overflow-y-auto h-64">
                                <div className="text-gray-300 lg:px-8 px-4">
                                    {[...Array(36)].map((_, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "w-full border-gray-600 py-2",
                                                index !== 35 && "border-b"
                                            )}
                                        >
                                            <Link href={`#${index}`} className="hover:text-gray-500 transition-all duration-300">
                                                <p className="px-2">Dua {index + 1}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative lg:w-[550px] lg:h-[550px] w-full h-full lg:pe-4 py-4 lg:translate-x-0 translate-x-1/2">
                            <div className="absolute lg:top-4 top-0 lg:-translate-x-20 -translate-x-[132px] flex items-center mt-1">
                                <div className="px-6 py-2 bg-gray-300 rounded-xl text-primary -mr-7">
                                    <p className="text-xs">Dua Masuk Masjid</p>
                                </div>
                                <Image
                                    src="/assets/images/dua/arrow.png"
                                    alt="Arrow"
                                    width={100}
                                    height={100}
                                    className="absolute -translate-y-1/2 top-full left-full"
                                />
                            </div>
                            <div className="h-full lg:w-full w-[500px] lg:ml-0 -ml-10">
                                <Image
                                    src="/assets/images/dua/globe.png"
                                    alt="Dua"
                                    width={600}
                                    height={600}
                                    className="transform transition-all hover:scale-105 hover:-rotate-12 duration-300 lg:w-full lg:h-full opacity-50 mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="pt-20 text-center text-background z-10 space-y-10 w-full lg:max-w-4xl md:max-w-3xl max-w-xs">
                    <h3 className="text-lg">Doa Masuk Masjid</h3>
                    <h2 className="text-2xl leading-loose">أعُوْذُ بِاللهِ العَظِيْمِ وَبِوَجْهِهِ الْكَرِيْمِ وَسُلْطَانِهِ الْقَدِيْمِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. بِسْمِ اللهِ وَالْحَمْدُ لِلهِ. أَللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ. اَللَّهُمَّ اغْفِرْ لِي ذُنُوْبِي وَافْتَحْ لِي أَبْوَابَ فَضْلِكَ</h2>
                    <p className="leading-loose">
                        <span>“</span>
                        Aku berlindung kepada Allah Yang Maha Besar, kepada Dzat-Nya Yang Maha Mulia, dan kepada kerajaan-Nya Yang Sedia dari setan yang terlontar. Dengan nama Allah dan segala puji bagi Allah. Hai Tuhanku, berilah shalawat dan sejahtera atas Sayyidina Muhammad dan atas keluarga Sayyidina Muhammad. Hai Tuhanku, ampuni untukku segala dosaku. Bukakan lah bagiku segala pintu kemurahan-Mu.
                        <span>”</span>
                    </p>
                </div>
            </section>
        </Layout>
    );
}


