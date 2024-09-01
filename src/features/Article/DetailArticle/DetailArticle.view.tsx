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
import { ChevronDownCircle } from 'lucide-react';

const DetailArticleView: FC<DetailArticleViewProps> = ({
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
}) => {
  return (
    <>
      <section className="md:min-h-screen min-h-[30vh] md:mt-0 mt-[87px] relative w-full">
        <div className="absolute inset-0 bg-black opacity-40 z-10" />
        <div className="absolute inset-0">
          <Image
            src={data?.thumbnail_url ? data?.thumbnail_url : data?.cover || ''}
            width={0}
            height={0}
            sizes="100vw"
            alt={data?.title || 'Article Cover'}
            className="w-full md:h-full h-[30vh] object-cover"
            priority
          />
        </div>
        <div className="absolute inset-x-0 bottom-[10%] flex items-center justify-center z-20">
          <div className="text-white text-center space-y-8 md:max-w-md max-w-xs">
            <h1 className="md:text-3xl text-lg font-semibold">{data?.title}</h1>
            <Button
              size="sm"
              variant="outline"
              type="button"
              className="rounded-full text-primary px-10 lg:flex hidden mx-auto relative z-50"
              onClick={() => onScrollSmooth('#section-detail-article')}
            >
              <ChevronDownCircle className="mr-2 h-4 w-4" />
              <span>Scroll Down</span>
            </Button>
          </div>
        </div>
      </section>
      <section
        id="section-detail-article"
        className="min-h-screen bg-[#191919] md:py-14 py-8"
      >
        <div className="md:max-w-[800px] max-w-xs mx-auto md:space-y-8 space-y-4">
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
                      <FaLink className="md:text-xl text-lg" />
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

          <div className="relative overflow-hidden rounded-2xl md:h-[500px] md:-mx-32 -mx-4">
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

          <div
            dangerouslySetInnerHTML={{ __html: data?.desc || '' }}
            className="leading-normal md:text-lg text-sm !font-thin"
          />

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

          <div className="flex gap-2 overflow-scroll md:max-w-[800px] pt-2 pb-4 !mt-4">
            {relatedPost?.map((article: ArticleState, index) => (
              <div
                key={index}
                className={cn(
                  'flex flex-col gap-3 cursor-pointer custom-scrollbar hover:-translate-y-2 duration-300 transition-all',
                  relatedPost?.length <= 5
                    ? 'md:max-w-[153.5px] max-w-[120px]'
                    : 'md:min-w-[153.5px] min-w-[120px]',
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
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(DetailArticleView);
