import { Button } from '@/components/ui/button';
import { ArticleState } from '@/features/Article/Article.type';
import { DetailArticleViewProps } from '@/features/Article/DetailArticle/DetailArticle.type';
import Image from 'next/image';
import React, { FC, memo } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  FaCheck,
  FaEllipsis,
  FaEye,
  FaFacebook,
  FaInstagram,
  FaLink,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';
import Link from 'next/link';
import Icon from '@/components/icon';
import { FaCheckCircle, FaRegFileImage } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ChevronDownCircle, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Swiper from '@/components/ui/swiper';
import { IoMdStopwatch } from 'react-icons/io';

const ConvertText = dynamic(() => import('@/components/convert-text'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const DetailArticleView = ({
  data,
  relatedPost,
  isCopied,
  onShareWhatsapp,
  onCopyLink,
  onShareFacebook,
  onShareX,
  onShareInstagram,
  onScrollSmooth,
  onRedirect,
}: DetailArticleViewProps) => {
  return (
    <>
      <section
        className="md:min-h-[100vh] min-h-[78vh] md:mt-0 mt-[87px] relative w-full"
        style={{
          background: `url(${data?.thumbnail_url ? data?.thumbnail_url : data?.cover || ''}) no-repeat center center / cover`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 opacity-70" />
        <div className="absolute inset-0 flex items-center justify-start z-20 bg-black bg-opacity-50 pt-10 pb-20">
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
            <h1
              data-aos="fade-up"
              className="lg:text-[48px] md:text-[42px] text-[22px] text-lg font-semibold !leading-normal my-4 w-3/4"
            >
              {data?.title}
            </h1>
            <div className="flex items-center md:gap-4 gap-2">
              <h2 className="capitalize md:text-lg text-sm">
                {data?.category?.name || 'Category'}
              </h2>
              <span>•</span>
              <div className="flex items-center md:gap-4 gap-2">
                <button
                  type="button"
                  className="rounded-full bg-transparent hover:text-gray-500 text-white flex justify-center items-center"
                  onClick={() => onScrollSmooth('#section-detail-article')}
                >
                  <FaInstagram className="md:text-2xl text-xl" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-transparent hover:text-gray-500 text-white flex justify-center items-center"
                  onClick={() => onScrollSmooth('#section-detail-article')}
                >
                  <FaFacebook className="md:text-lg" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-transparent hover:text-gray-500 text-white flex justify-center items-center"
                  onClick={() => onScrollSmooth('#section-detail-article')}
                >
                  <FaXTwitter className="md:text-lg" />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md text-primary md:px-10 md:py-[10px] px-6 py-2 bg-transparent border text-white flex items-center md:mt-12 mt-8 hover:-translate-y-2 shadow-xl transition-all duration-300 ease-in-out hover:bg-[#191919] hover:text-white md:!text-base !text-xs"
              onClick={() => onScrollSmooth('#section-detail-article')}
            >
              Read More
              <ChevronDownCircle className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
      <section
        id="section-detail-article"
        className="min-h-screen bg-[#191919] md:py-14 py-8"
      >
        <div className="lg:max-w-[800px] md:max-w-[650px] max-w-xs mx-auto lg:space-y-8 space-y-4">
          <Breadcrumb>
            <BreadcrumbList className="text-md">
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-white hover:text-[#777A7B]"
                  href="/article"
                >
                  Article
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="!text-white">
                  {data?.category?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-bold md:text-[35px] text-lg leading-normal md:!my-10 my-4">
            {data?.title}
          </h1>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-[6px]">
                <Icon className="!h-6 !w-6" />
                <h4 className="font-semibold">JDF Article</h4>
              </Link>
              <FaCheckCircle className="text-green-500" />
            </div>
            <div className="flex items-center justify-between text-[#777A7B] h-fit md:mt-0 -mt-3">
              <p className="md:text-lg text-sm text-[#777A7B] flex items-center gap-2 h-4">
                {typeof window !== 'undefined' &&
                  new Date(data?.created_at ?? '').toLocaleString('ja-JP', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>

              <div className="flex items-center text-[#777A7B]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center gap-2 !w-14"
                >
                  <FaEye className="md:text-xl text-lg" />
                  <span>{data?.views || 0}</span>
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onShareWhatsapp} // send whatsapp
                >
                  <FaWhatsapp className="md:text-xl text-lg" />
                </Button>

                <Tooltip open={isCopied}>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" onClick={onCopyLink}>
                      {!isCopied ? (
                        <FaLink className="md:text-xl text-lg" />
                      ) : (
                        <FaCheck className="md:text-xl text-lg" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Link copied!</p>
                  </TooltipContent>
                </Tooltip>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent !py-2 !px-3">
                        <FaEllipsis className="rotate-90" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-2">
                        <Button
                          variant="ghost"
                          onClick={onShareFacebook}
                          className="w-full flex items-center justify-start"
                        >
                          <FaFacebook className="md:text-xl text-lg" />
                          <span className="ml-2">Facebook</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={onShareX}
                          className="w-full flex items-center justify-start"
                        >
                          <FaXTwitter className="md:text-xl text-lg" />
                          <span className="ml-2">X</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={onShareInstagram}
                          className="w-full flex items-center justify-start"
                        >
                          <FaInstagram className="md:text-xl text-lg" />
                          <span className="ml-2">Instagram</span>
                        </Button>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl md:h-[500px] lg:-mx-32 md:-mx-8 -mx-4">
            <Image
              src={
                data?.thumbnail_url ? data?.thumbnail_url : data?.cover || ''
              }
              width={0}
              height={0}
              sizes="100vw"
              alt={data?.title || 'Article Cover'}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {data?.desc && (
            <ConvertText
              text={data?.desc || ''}
              className="leading-normal md:text-lg text-sm !font-thin"
            />
          )}

          <div className="relative overflow-hidden rounded-2xl md:h-80">
            <Image
              src={
                data?.thumbnail_url ? data?.thumbnail_url : data?.cover || ''
              }
              width={0}
              height={0}
              sizes="100vw"
              alt={data?.title || 'Article Cover'}
              className="w-full h-full object-cover"
              priority
            />
            <small className="absolute top-4 right-0 bg-black bg-opacity-50 text-white py-2 px-10 rounded-full rounded-r-none text-md capitalize">
              {data?.status}
            </small>
          </div>

          {data?.keywords && (
            <div className="flex flex-wrap gap-1">
              {data?.keywords.split(',').map((keyword, index) => (
                <span
                  key={index}
                  className="text-md rounded-full px-6 py-2 bg-blue-500 bg-opacity-10 text-blue-500 capitalize"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          <h1 className="border-l-4 border-[#f05454] pl-2 font-semibold !mt-12 md:text-2xl text-lg">
            Related Post
          </h1>

          <Swiper
            className="slider-container-related-post !mt-4"
            autoplay={true}
            slidesToScroll={5}
            slidesToShow={5}
            infinite={true}
            speed={5000}
            buttonNextClassName="lg:!-right-5 !-right-3 !p-1 !top-[25%]"
            buttonPrevClassName="!p-1 !top-[25%]"
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  dots: true,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  dots: true,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  dots: true,
                },
              },
            ]}
          >
            {relatedPost?.map((article: ArticleState, index: number) => (
              <div
                key={index}
                className={cn(
                  'flex space-y-4 cursor-pointer custom-scrollbar hover:-translate-y-2 duration-300 transition-all pt-2',
                )}
                onClick={() => onRedirect(article?.slug || '')}
              >
                <div className="relative overflow-hidden rounded-xl md:h-44 h-32 border-[#777A7B] border">
                  {article?.thumbnail_url ? (
                    <Image
                      src={article?.thumbnail_url || ''}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt={article?.title || 'Article Cover'}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <FaRegFileImage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#777A7B] text-2xl" />
                  )}
                </div>
                <h4 className="font-semibold">
                  {article?.title || 'Article Title'}
                </h4>
              </div>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default DetailArticleView;
