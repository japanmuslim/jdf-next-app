import Layout from '@/layouts/Layout';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { VideoState } from '../Home.type';
import { useGetVideoQuery } from '@/services/api/homeService';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import Loading from '@/components/page/loading';
import dynamic from 'next/dynamic';
import { IoArrowBack, IoBackspace, IoClose } from 'react-icons/io5';
import CanvasVideos from '../components/3dEffects/CanvasVideos';
import FallingSakura from '../components/fallingSakura/FallingSakura';

const VideoEmbed = dynamic(() => import('@/components/video-embed'), {
  ssr: false,
  loading: () => <Loading />,
  suspense: true,
});

interface VideosProps {
  data: VideoState[];
}

const Videos = (props: VideosProps) => {
  const { data } = props;

  const [videoId, setVideoId] = useState<number | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: dataVideo, isLoading } = useGetVideoQuery(videoId || 0, {
    skip: !videoId,
  });

  const onHandleVideo = useCallback(
    (videoId: number) => {
      setVideoId(videoId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataVideo],
  );

  const handleDrawer = useCallback(() => {
    setIsOpen(false);
    setVideoId(null);
  }, []);

  useEffect(() => {
    if (dataVideo) {
      setVideoUrl(dataVideo.data?.link);
      setIsOpen(true);
    } 
  }, [dataVideo]);

  return (
    <Layout
      id="home"
      pageTitle="Categories | Japan Dahwa Foundation"
      pageDescription="Home page description"
      className="overflow-x-hidden"
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <button
          type="button"
          onClick={() => history.back()}
          className="absolute top-24 left-4 rounded-full bg-primary/20 hover:bg-primary flex z-50 px-4 py-2 cursor-pointer font-semibold text-lg"
        >
          {' '}
          &lt; &nbsp; 戻る
        </button>
        <section
          id="hero"
          className="flex items-center justify-center min-h-screen w-full relative"
        >
          {/* Video Canvas */}
          <CanvasVideos data={data} onHandleVideo={onHandleVideo} />
        </section>
      </div>
      <Sheet open={isOpen}>
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription>Description goes here</SheetDescription>
        <SheetContent
          side="bottom"
          className="z-[999999] min-w-[100vw] p-0 h-full max-h-[100vh] overflow-y-auto bg-primary border-none flex items-center justify-center"
        >
          <VideoEmbed src={videoUrl} />
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
