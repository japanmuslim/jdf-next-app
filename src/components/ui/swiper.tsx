'use client';

import React, { FC, memo, useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

interface SwiperProps {
  children?: React.ReactNode;
  infinite?: boolean;
  dots?: boolean;
  speed?: number;
  autoplay?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  className?: string;
  buttonPrevClassName?: string;
  buttonNextClassName?: string;
  responsive?: Responsive[];
}

interface Responsive {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
    dots: boolean;
  };
}

const NextArrow = (props: any) => {
  const { onClick, buttonNextClassName } = props;

  return (
    <button
      className={`rounded-full bg-primary p-2 shadow absolute translate-y-1/2 md:top-20 top-12 -right-2 z-50 ${
        buttonNextClassName ?? ''
      }`}
      onClick={onClick}
      style={{ display: onClick ? 'block' : 'none' }}
    >
      <ChevronRight />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick, buttonPrevClassName } = props;

  return (
    <button
      className={`rounded-full bg-primary p-2 shadow absolute translate-y-1/2 md:top-20 top-12 -left-5 z-50 ${
        buttonPrevClassName ?? ''
      }`}
      onClick={onClick}
      style={{
        display: onClick ? 'block' : 'none',
      }}
    >
      <ChevronRight className="rotate-180" />
    </button>
  );
};

const Swiper: FC<SwiperProps> = ({
  children,
  infinite = false,
  slidesToShow,
  slidesToScroll,
  autoplay = false,
  dots = true,
  speed = 500,
  className,
  buttonNextClassName,
  buttonPrevClassName,
  responsive = [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
}) => {
  return (
    <div className={`slider-container lg:-mr-3 -mr-[13px] ${className}`}>
      <Slider
        initialSlide={0}
        infinite={infinite}
        slidesToShow={
          slidesToShow ? slidesToShow : responsive[0].settings.slidesToShow
        }
        slidesToScroll={
          slidesToScroll
            ? slidesToScroll
            : responsive[0].settings.slidesToScroll
        }
        dots={dots}
        speed={speed}
        autoplay={autoplay}
        nextArrow={<NextArrow buttonNextClassName={buttonNextClassName} />}
        prevArrow={<PrevArrow buttonPrevClassName={buttonPrevClassName} />}
        autoplaySpeed={5000}
        responsive={responsive}
      >
        {children}
      </Slider>
    </div>
  );
};

export default memo(Swiper);
