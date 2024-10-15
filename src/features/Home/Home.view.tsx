import GridVideos from './components/GridVideos';
import { TafseerState } from '../Tafseer/Tafseer.type';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import VideoEmbed from '@/components/video-embed';
import { IoClose } from 'react-icons/io5';
import { useRef, useState } from 'react';

interface HomeViewProps {
  step: number;
  data?: TafseerState[];
  videoUrl?: string;
  playVideo?: boolean;
  onTogglePlay?: (videoUrl: string) => void;
}

const Button = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    type="button"
    className="text-white font-extrabold text-3xl text-center w-40 duration-300 hover:scale-125"
    onClick={onClick}
  >
    {label}
  </button>
);

const HomeView = (props: HomeViewProps) => {
  const { data, step, playVideo, videoUrl, onTogglePlay } = props;

  const ref = useRef<HTMLDivElement>(null);

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape') {
  //     onTogglePlay?.('');
  //   }
  // });

  return (
    <>
      {step === 0 && (
        <section className="flex items-center justify-center min-h-screen w-full relative">
          <div className="absolute -translate-y-1/2 -translate-x-1/2 top-[43%] left-1/2 flex justify-around w-[100%] z-50 px-10">
            <Button onClick={() => {}} label="ムスリム" />
            <Button onClick={() => {}} label="非ムスリム" />
          </div>
          <VideoEmbed
            src="/assets/videos/home/section.mp4"
            loop
            playing
            controls={false}
          />
        </section>
      )}
      <section id="hero" className="min-h-screen w-full">
        {/* <GridVideos data={data} onTogglePlay={onTogglePlay} />
      <Sheet open={playVideo}>
        <SheetContent
          ref={ref}
          side="bottom"
          className="z-[999999] min-w-[100vw] p-0 h-full max-h-[100vh] overflow-y-auto bg-primary border-none flex items-center justify-center"
        >
          <VideoEmbed src={videoUrl || ''} />
          <SheetClose asChild>
            <button
              type="button"
              onClick={() => onTogglePlay?.('')}
              className="absolute top-4 right-4 rounded-full bg-primary/20 hover:bg-primary flex items-center justify-center z-50 w-10 h-10"
            >
              <IoClose className="text-white" />
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet> */}
      </section>
    </>
  );
};

export default HomeView;
