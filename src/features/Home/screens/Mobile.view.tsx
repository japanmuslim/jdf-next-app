import Layout from '@/layouts/Layout';
import React, { useCallback, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CategoryVideoProps } from '../Home.type';
import Image from 'next/image';
import { useGetVideoQuery } from '@/services/api/homeService';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { IoClose } from 'react-icons/io5';

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

interface MobileViewProps {
  data: CategoryVideoProps[];
}

const MobileView = (props: MobileViewProps) => {
  const { data } = props;

  const [videoId, setVideoId] = useState<number | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: dataVideo, isLoading } = useGetVideoQuery(videoId || 0, {
    skip: !videoId,
  });

  const handleVideo = useCallback(
    (videoId: number) => {
      setIsOpen(true);
      setVideoUrl(dataVideo?.data?.link || '');
      setVideoId(videoId);
    },
    [dataVideo],
  );

  const handleDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Layout
      id="home"
      pageTitle="Categories | Japan Dahwa Foundation"
      pageDescription="Home page description"
    >
      <section className="w-full h-full md:pt-0 pt-[88px] overflow-x-hidden">
        {data?.map((val, index) => (
          <Accordion key={val?.id} type="single" collapsible>
            <AccordionItem value={`item-${index + 1}`} className="!border-b">
              <AccordionTrigger className="!py-0 !-mr-4">
                <div className="h-40 md:h-72 relative w-full">
                  <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
                  <Image
                    src={val?.thumbnail}
                    alt={val?.category_name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-[#191919] !py-0">
                <div className="flex flex-col">
                  {val?.videos?.map((video, index) => (
                    <div
                      key={video?.id}
                      className="flex gap-4 border-b-[1px] border-[#777A7B] p-4 hover:bg-[#333333] cursor-pointer"
                      onClick={() => handleVideo(video?.id)}
                    >
                      <Image
                        src={video?.thumbnail_url || '/images/placeholder.png'}
                        alt={video?.name_video || 'Video'}
                        width={120}
                        height={100}
                        loading="lazy"
                      />
                      <div className="flex flex-col gap-1 h-full justify-center">
                        <h3 className="text-sm font-medium">
                          {video?.name_video}
                        </h3>
                        <p className="text-xs text-[#777A7B]">
                          {video?.description_video}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
      <Sheet open={isOpen}>
        <SheetContent
          side="bottom"
          className="z-[999999] p-0 h-full overflow-y-auto bg-primary border-none flex items-center justify-center"
        >
          <VideoEmbed src={videoUrl || ''} />
          <SheetClose asChild>
            <button
              type="button"
              onClick={handleDrawer}
              className="absolute top-4 right-4 rounded-full bg-black/40 hover:bg-white/40 flex items-center justify-center z-50 w-8 h-8 outline-none"
            >
              <IoClose className="text-white text-xl" />
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </Layout>
  );
};

export default MobileView;