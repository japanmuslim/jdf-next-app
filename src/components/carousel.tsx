import Image from 'next/image';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArticleState } from '@/features/Article/Article.type';
import { ChevronDownCircle } from 'lucide-react';
import Icon from './icon';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

import AOS from 'aos';
import 'aos/dist/aos.css';

interface CarouselProps {
  id: string;
  data?: ArticleState[];
}

const Carousel: FC<CarouselProps> = ({ id = 'carousel', data }) => {
  const router = useRouter();
  const sliderRef = useRef<Slider>(null); // Menggunakan ref untuk mengontrol slider
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleCurrentSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    AOS.refresh();

    if (sliderRef.current) sliderRef.current.slickGoTo(index);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    fade: true,
    afterChange: (index: number) => setCurrentSlide(index),
  };

  const convertHtmlToText = (html: string) => {
    const txt = document.createElement('div');
    txt.innerHTML = html;

    const splitText = txt.textContent?.split('\n');

    return splitText?.[0] ?? '';
  };

  const handleScrollSmooth = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  // return (
  //   <header id={id} className="md:h-screen h-[80vh] w-full">
  //     <div className="slider-container -mr-4 md:mb-0 -mb-2">
  //       <Slider {...settings}>
  //         {data?.map((item, index) => (
  //           <div
  //             key={index}
  //             className="relative overflow-hidden w-full md:h-screen h-[80vh]"
  //           >
  //             <div className="absolute bg-black opacity-20 inset-0 w-full h-full z-[100]" />
  //             <Image
  //               src={item?.thumbnail_url || '/images/placeholder.jpg'}
  //               width={1000}
  //               height={1000}
  //               alt={item.title}
  //               className="w-full h-full object-cover"
  //             />
  //             <div className="absolute inset-x-0 bg-black bg-opacity-50 bottom-0 lg:h-[300px] h-[180px] flex flex-col">
  //               <div className="flex items-center gap-2 lg:py-6 py-2 lg:pl-12 pl-6">
  //                 <div className="flex items-center gap-[6px]">
  //                   <Icon className="!h-6 !w-6" />
  //                   <h4 className="font-semibold">JDF Article</h4>
  //                 </div>
  //                 <FaCheckCircle className="text-green-500" />
  //               </div>
  //               <div className="h-40 rounded-[50px] rounded-l-none rounded-b-none bg-opacity-60 bg-[#191919] flex-1 lg:pl-12 pl-6 border-t lg:pt-0 pt-6">
  //                 <h1 className="md:text-4xl text-lg font-semibold text-white">
  //                   {item.title}
  //                 </h1>
  //                 <p className="md:text-lg text-xs !font-normal text-white">
  //                   {convertHtmlToText(item?.desc)}
  //                   <Link href={`/article/${item?.slug}`}>Read More...</Link>
  //                 </p>
  //                 <Button
  //                   size="sm"
  //                   variant="outline"
  //                   type="button"
  //                   className="rounded-full text-primary px-10 lg:flex hidden mx-auto relative z-50 mt-10 py-6"
  //                   onClick={() => handleScrollSmooth('#list-article')}
  //                 >
  //                   <ChevronDownCircle className="mr-2 h-4 w-4" />
  //                   <span>Scroll Down</span>
  //                 </Button>
  //               </div>
  //             </div>
  //             <div className="absolute inset-0 bg-black bg-opacity-60" />
  //             <div className="absolute bottom-[13%] inset-x-0 flex items-center justify-center -mr-4">
  //               <div className="text-white text-center space-y-4 md:max-w-md max-w-xs">
  //                 <Link
  //                   href={`/article/${item?.slug}`}
  //                   className="hover:text-[#777A7B] duration-300"
  //                 >
  //                   <h1 className="md:text-3xl text-lg font-semibold">
  //                     {item.title}
  //                   </h1>
  //                   <div
  //                     className="md:text-md text-sm !font-thin"
  //                     dangerouslySetInnerHTML={{
  //                       __html: `${item?.desc.slice(0, 80)}`,
  //                     }}
  //                   />
  //                 </Link>
  //                 <Button
  //                   size="sm"
  //                   variant="outline"
  //                   type="button"
  //                   className="rounded-full text-primary px-10 lg:flex hidden mx-auto relative z-50"
  //                   onClick={() => handleScrollSmooth('#list-article')}
  //                 >
  //                   <ChevronDownCircle className="mr-2 h-4 w-4" />
  //                   <span>Scroll Down</span>
  //                 </Button>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </Slider>
  //     </div>
  //   </header>
  // );
  return (
    <header
      id={id}
      className="lg:h-screen md:h-[50vh] h-screen w-full overflow-hidden"
    >
      <div className="slider-container -mr-4 md:mb-0 -mb-2">
        <Slider ref={sliderRef} {...settings}>
          {data?.map((item, index) => (
            <div key={index} className="lg:min-h-screen md:h-[50vh] h-screen">
              <div className="flex flex-row">
                <div className="lg:w-[60%] md:w-[70%] w-[100%] bg-[#191919] h-screen relative">
                  <Image
                    src={item?.thumbnail_url || '/images/placeholder.jpg'}
                    width={1000}
                    height={1000}
                    alt="placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:hidden absolute bottom-0 inset-x-0 !rounded-tr-[50px] overflow-hidden w-full">
                  <div className="bg-pattern-dark px-4 md:py-10 py-4 min-h-[200px] border-l-4 border-red-600 shadow-lg lg:space-y-10 md:space-y-6 space-y-4 flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-[6px]">
                          <Icon className="!h-6 !w-6" />
                          <h4 className="font-semibold">JDF Article</h4>
                        </div>
                        <FaCheckCircle className="text-green-500" />
                      </div>
                    </div>
                    <div className="space-y-4 flex-1">
                      <h1 className="lg:text-2xl md:text-xl text-base font-semibold text-white text-start max-w-xs">
                        {item?.title}
                      </h1>
                      <p className="lg:text-base md:text-sm text-[10px] !font-normal text-white text-start max-w-xs">
                        {convertHtmlToText(item?.desc)}
                        {'。。'}
                      </p>
                    </div>
                    {/* <div className="flex gap-3 mt-10">
                      <button className="py-2 px-6 rounded border hover:bg-white duration-300 transition-all hover:text-primary">
                        Read More
                      </button>
                      <button
                        onClick={() => handleScrollSmooth('#list-article')}
                        className="py-2 px-6 rounded border flex items-center gap-2 hover:bg-white duration-300 transition-all hover:text-primary"
                      >
                        Scroll Down <ChevronDownCircle className="h-4 w-4" />
                      </button>
                    </div> */}
                    <ul className="flex items-center justify-center">
                      {data?.map((_, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-center h-3 w-3 cursor-pointer rounded-full"
                        >
                          <button
                            onClick={() => handleCurrentSlide(index)}
                            className={`rounded-full cursor-pointer ${
                              currentSlide === index
                                ? 'bg-white h-full w-full'
                                : index - 1 === currentSlide ||
                                    index + 1 === currentSlide
                                  ? 'bg-primary h-[6px] w-[6px]'
                                  : 'bg-primary h-[4px] w-[4px]'
                            }`}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:w-[40%] md:w-[30%] w-[50%] bg-pattern lg:h-screen md:h-[50vh] h-[80vh] md:flex hidden flex-col justify-center px-10">
                  <div className="bg-[#191919] px-8 py-10 lg:-ml-60 md:-ml-80 relative z-50 border-l-4 border-red-600 shadow-lg lg:space-y-10 md:space-y-6">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-[6px]">
                          <Icon className="!h-6 !w-6" />
                          <h4 className="font-semibold">JDF Article</h4>
                        </div>
                        <FaCheckCircle className="text-green-500" />
                      </div>
                    </div>
                    <div data-aos="fade-left" className="space-y-4">
                      <h1 className="lg:text-2xl md:text-xl text-lg font-semibold text-white text-start max-w-xl">
                        {item?.title}
                      </h1>
                      <p className="lg:text-base md:text-sm text-xs !font-normal text-white text-start max-w-xl">
                        {convertHtmlToText(item?.desc)}
                        {'。。'}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-10">
                      <button
                        className="py-2 px-6 rounded border hover:bg-white duration-300 transition-all hover:text-primary font-medium"
                        onClick={() => router.push(`/article/${item?.slug}`)}
                      >
                        Read More
                      </button>
                      <button
                        onClick={() => handleScrollSmooth('#list-article')}
                        className="py-2 px-6 rounded border flex items-center gap-2 hover:bg-white duration-300 transition-all hover:text-primary font-medium"
                      >
                        Scroll Down <ChevronDownCircle className="h-4 w-4" />
                      </button>
                    </div>
                    <ul className="flex gap-2 items-center">
                      {data?.map((_, index) => (
                        <li
                          key={index}
                          onClick={() => handleCurrentSlide(index)}
                          className={`rounded-full cursor-pointer ${
                            currentSlide === index
                              ? 'bg-white h-[8px] w-[8px]'
                              : index - 1 === currentSlide ||
                                  index + 1 === currentSlide
                                ? 'bg-primary h-[6px] w-[6px]'
                                : 'bg-primary h-[4px] w-[4px]'
                          }`}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </header>
  );
};

export default memo(Carousel);
