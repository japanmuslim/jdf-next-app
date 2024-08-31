import Image from 'next/image';
import React, { FC, memo } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArticleState } from '@/features/Article/Article.type';
import Link from 'next/link';
import { Button } from './ui/button';
import { ChevronDownCircle } from 'lucide-react';

interface CarouselProps {
  id: string;
  data?: ArticleState[];
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
};

const Carousel: FC<CarouselProps> = ({ id = 'carousel', data }) => {
  const handleScrollSmooth = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start',
      });
    }
  };

  return (
    <header id={id} className="md:h-screen h-[80vh] overflow-hidden w-full">
      <div className="slider-container -mr-4 md:mb-0 -mb-2">
        <Slider {...settings}>
          {data?.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden w-full md:h-screen h-[80vh]"
            >
              <Image
                src={item?.thumbnail_url || '/images/placeholder.jpg'}
                width={500}
                height={300}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60" />
              <div className="absolute bottom-[13%] inset-x-0 flex items-center justify-center -mr-4">
                <div className="text-white text-center space-y-4 md:max-w-md max-w-xs">
                  <Link
                    href={`/article/${item?.slug}`}
                    className="hover:text-[#777A7B] duration-300"
                  >
                    <h1 className="md:text-3xl text-lg font-semibold">
                      {item.title}
                    </h1>
                    <div
                      className="md:text-md text-sm !font-thin"
                      dangerouslySetInnerHTML={{
                        __html: `${item?.desc.slice(0, 80)}`,
                      }}
                    />
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    className="rounded-full text-primary px-10 lg:flex hidden mx-auto relative z-50"
                    onClick={() => handleScrollSmooth('#list-article')}
                  >
                    <ChevronDownCircle className="mr-2 h-4 w-4" />
                    <span>Scroll Down</span>
                  </Button>
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
