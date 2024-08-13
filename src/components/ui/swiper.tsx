'use client';

import React, { FC, memo } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronRight } from 'lucide-react';

interface SwiperProps {
  children?: React.ReactNode;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  dots?: boolean;
  speed?: number;
}

const NextArrow = (props: any) => {
  const { onClick, currentSlide, slideCount } = props;
  return (
    <button
      className="rounded-full bg-primary p-2 shadow absolute translate-y-1/2 md:top-20 top-12 -right-2 z-50"
      onClick={onClick}
      style={{
        display:
          currentSlide === slideCount - 2 || currentSlide === slideCount - 3
            ? 'none'
            : 'block',
      }}
    >
      <ChevronRight size={28} />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick, currentSlide } = props;
  return (
    <button
      className="rounded-full bg-primary p-2 shadow absolute translate-y-1/2 md:top-20 top-12 -left-5 z-50"
      onClick={onClick}
      style={{ display: currentSlide === 0 ? 'none' : 'block' }}
    >
      <ChevronRight size={28} className="rotate-180" />
    </button>
  );
};

const Swiper: FC<SwiperProps> = ({
  children,
  infinite = false,
  slidesToShow = 3,
  slidesToScroll = 3,
  dots = true,
  speed = 500,
}) => {
  return (
    <div className="slider-container lg:-mr-3 -mr-[13px]">
      <Slider
        initialSlide={0}
        infinite={infinite}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        dots={dots}
        speed={speed}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: false,
            },
          },
        ]}
      >
        {children}
      </Slider>
    </div>
  );
};

export default memo(Swiper);
