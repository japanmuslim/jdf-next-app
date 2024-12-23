/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  Grid,
  Navigation,
  Pagination,
  EffectFade,
} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { FaChevronRight } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

interface NewSwiperProps {
  id: string;
  children?: React.ReactNode[];
  href?: string;
  className?: string;
  classNameSlide?: string;
  buttonClassName?: string;
  buttonNextClassName?: string;
  buttonNextLabelClassName?: string;
  buttonPrevClassName?: string;
  buttonPrevLabelClassName?: string;
  pagination?: boolean;
  effectFade?: boolean;
  dynamicBullets?: boolean;
  breakpoint?: any;
  autoHeight?: boolean;
  autoPlay?: boolean;
}

const NewSwiper = (props: NewSwiperProps) => {
  const {
    id,
    children,
    href,
    className,
    classNameSlide,
    buttonClassName,
    buttonNextClassName,
    buttonPrevClassName,
    pagination = true,
    dynamicBullets = true,
    autoHeight = true,
    effectFade = false,
    autoPlay = true,
    buttonNextLabelClassName,
    buttonPrevLabelClassName,
    breakpoint = {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
  } = props;

  const sliderRef = useRef<SwiperRef>(null);

  const [disabledPrev, setDisablePrev] = useState(true); // Default pada slide pertama
  const [disableNext, setDisableNext] = useState(false); // Default bukan slide terakhir

  const onSlideChange = useCallback((swiper: any) => {
    setDisablePrev(swiper.isBeginning);
    setDisableNext(swiper.isEnd);
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  //   const { ref, inView } = useInView({
  //     threshold: 0,
  //     rootMargin: '-50% 0% -50% 0%',
  //   });

  //   useEffect(() => {
  //     if (sliderRef.current && sliderRef.current.swiper) {
  //       if (inView) {
  //         sliderRef.current.swiper.autoplay.start();
  //       } else {
  //         sliderRef.current.swiper.autoplay.stop();
  //       }
  //     }
  //   }, [inView]);

  return (
    <div className="relative">
      {/* Tombol Next */}
      <button
        type="button"
        className={cn(
          'absolute -right-3 top-1/3 z-50 translate-y-1/2 rounded-full bg-primary p-2 shadow duration-300 hover:!bg-[#EBEEFF] hover:!shadow-lg lg:right-20 group',
          `swiper-button-next-${id}`,
          buttonNextClassName ?? '',
          disableNext && 'hidden', // Sembunyikan jika di slide terakhir
        )}
        onClick={handleNext}
      >
        <FaChevronRight
          className={cn(
            buttonNextClassName?.includes('bg-primary') && 'text-white',
            buttonNextLabelClassName,
            'group-hover:text-primary',
          )}
        />
      </button>

      {/* Swiper */}
      <Swiper
        autoHeight={autoHeight}
        ref={sliderRef}
        speed={2000}
        // onSlideChange={onSlideChange}
        watchOverflow
        // navigation={{
        //   nextEl: `.swiper-button-next-${id}`,
        //   prevEl: `.swiper-button-prev-${id}`,
        //   disabledClass: 'hidden',
        // }}
        {...(effectFade && {
          effect: 'fade',
          fadeEffect: { crossFade: true },
          loop: true,
        })}
        onSwiper={(swiper: any) => {
          onSlideChange(swiper);
        }}
        onSlideChange={(swiper: any) => {
          onSlideChange(swiper);
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation, Grid, EffectFade]}
        className={cn(`swiper-container-${id} relative`, className)}
        {...(autoPlay && {
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            waitForTransition: true,
          },
        })}
        {...(pagination && {
          pagination: {
            dynamicBullets,
            clickable: true,
            type: 'bullets',
          },
        })}
        breakpoints={breakpoint}
      >
        {children?.map((child, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              'pb-4 sm:pb-6',
              // isLastSlide && index === children.length - 1 && 'md:mr-4',
              classNameSlide,
            )}
          >
            {child}
          </SwiperSlide>
        ))}

        {/* {href && (
          <div className="flex w-full justify-end pr-4 lg:pr-20">
            <ButtonVariant
              href={href}
              variant="accentGradient"
              label="Lihat Selengkapnya"
              className={buttonClassName}
            />
          </div>
        )} */}
      </Swiper>

      {/* Tombol Prev */}
      <button
        type="button"
        className={cn(
          'absolute -left-3 top-1/3 z-50 translate-y-1/2 rounded-full bg-primary p-2 shadow duration-300 hover:!bg-[#EBEEFF] hover:!shadow-lg group',
          `swiper-button-prev-${id}`,
          buttonPrevClassName ?? '',
          disabledPrev && 'hidden', // Sembunyikan jika di slide pertama
        )}
        onClick={handlePrev}
      >
        <FaChevronRight
          className={cn(
            'rotate-180',
            buttonPrevClassName?.includes('bg-primary') && 'text-white',
            buttonPrevLabelClassName,
            'group-hover:text-primary',
          )}
        />
      </button>
    </div>
  );
};

export default memo(NewSwiper);
