import Layout from '@/layouts/Layout';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { CategoryVideoProps, VideoState } from '../Home.type';
import GridVideos from '../components/GridPerspective';
import { useGetVideoQuery } from '@/services/api/homeService';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import Loading from '@/components/page/loading';
import dynamic from 'next/dynamic';
import { IoClose } from 'react-icons/io5';

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
});

interface VideosProps {
  data: CategoryVideoProps[];
}

const Videos = (props: VideosProps) => {
  const { data } = props;

  const [videoId, setVideoId] = useState<number | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: dataVideo, isLoading } = useGetVideoQuery(videoId || 0);

  const onHandleVideo = useCallback(
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
      <section
        id="hero"
        className="flex items-center justify-center min-h-screen w-full relative"
      >
        <GridVideos data={data} type="video" onHandleVideo={onHandleVideo} />
      </section>
      <Sheet open={isOpen}>
        <SheetContent
          side="bottom"
          className="z-[999999] min-w-[100vw] p-0 h-full max-h-[100vh] overflow-y-auto bg-primary border-none flex items-center justify-center"
        >
          <VideoEmbed src={videoUrl || ''} />
          <SheetClose asChild>
            <button
              type="button"
              onClick={handleDrawer}
              className="absolute top-4 right-4 rounded-full bg-primary/20 hover:bg-primary flex items-center justify-center z-50 w-10 h-10"
            >
              <IoClose className="text-white" />
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </Layout>
  );
};

export default memo(Videos);