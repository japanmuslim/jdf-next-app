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
import { FaCheckCircle, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/router';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';

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

  const handleRedirect = (slug: string) => {
    if (!slug) return;
    router.push(`/article/${slug}`);
  };

  return (
    <header
      id={id}
      className="lg:h-screen md:h-[60vh] h-[85vh] w-full overflow-hidden"
    >
      <div className="slider-container -mr-4 md:mb-0 -mb-2">
        <Slider ref={sliderRef} {...settings}>
          {data?.map((item, index) => (
            <div
              key={index}
              className="w-full lg:h-screen md:h-[60vh] h-[85vh] relative"
            >
              <Image
                src={
                  item?.thumbnail_url
                    ? item?.thumbnail_url
                    : item?.cover
                      ? item?.cover
                      : '/images/placeholder.png'
                }
                width={1000}
                height={1000}
                alt="placeholder"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 opacity-70" />
              <div className="absolute inset-0 flex items-center justify-start z-20 bg-black bg-opacity-50 pt-20">
                <div className="text-white text-start lg:pl-20 md:pl-14 pl-6 w-full">
                  <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                      <Icon className="md:!h-8 md:!w-8 h-6 w-6" />
                      <h4 className="font-semibold md:text-lg text-md mb-0">
                        JDF Article
                      </h4>
                    </Link>
                    <FaCheckCircle className="text-green-500 md:text-lg" />
                  </div>
                  <div className="space-y-4 lg!mt-8 md:!mt-6 !mt-4">
                    <h1
                      data-aos="fade-up"
                      className="lg:text-[48px] md:text-[38px] text-[24px] text-lg font-semibold !leading-normal w-3/4 m-0"
                    >
                      {item?.title}
                    </h1>
                    <h2
                      data-aos="fade-up"
                      className="lg:text-2xl md:text-xl text-md font-normal !leading-normal md:w-1/2 w-3/4 text-gray-300 m-0"
                    >
                      {convertHtmlToText(item?.desc)}
                      {'。。'}
                    </h2>
                    <div className="flex items-center md:gap-4 gap-2 lg:!my-8 md:!my-6 !my-4">
                      <h2 className="capitalize md:text-lg text-xs">
                        {item?.category?.name || 'Category'}
                      </h2>
                      <span>•</span>
                      <div className="flex items-center md:gap-4 gap-2">
                        <button
                          type="button"
                          className="rounded-full bg-transparent hover:text-gray-500 text-white flex justify-center items-center"
                          onClick={() =>
                            handleScrollSmooth('#section-detail-article')
                          }
                        >
                          <FaInstagram className="md:text-2xl text-md" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-transparent hover:text-gray-500 text-white flex justify-center items-center"
                          onClick={() =>
                            handleScrollSmooth('#section-detail-article')
                          }
                        >
                          <FaFacebook className="md:text-xl text-md" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-transparent hover:text-gray-500 text-white flex justify-center items-center"
                          onClick={() =>
                            handleScrollSmooth('#section-detail-article')
                          }
                        >
                          <FaXTwitter className="md:text-xl text-md" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul className="flex gap-2 items-center">
                    {data?.map((_, index) => (
                      <li
                        key={index}
                        onClick={() => handleCurrentSlide(index)}
                        className={`rounded-full cursor-pointer ${
                          currentSlide === index
                            ? 'bg-white md:h-[10px] md:w-[10px] h-[8px] w-[8px]'
                            : index - 1 === currentSlide ||
                                index + 1 === currentSlide
                              ? '!bg-[#777A7B] md:h-[8px] md:w-[8px] h-[6px] w-[6px]'
                              : '!bg-[#777A7B] md:h-[6px] md:w-[6px] h-[4px] w-[4px]'
                        }`}
                      />
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="rounded-md text-primary md:px-10 md:py-[10px] px-6 py-2 bg-transparent border text-white flex items-center lg:mt-12 mt-8 hover:translate-x-2 shadow-xl transition-all duration-300 ease-in-out hover:bg-[#191919] hover:text-white md:!text-base !text-xs"
                    onClick={() => handleRedirect(item?.slug)}
                  >
                    Read More
                    <ChevronDownCircle className="ml-2 h-4 w-4 -rotate-90" />
                  </button>
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
