import { cn } from '@/lib/utils';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Loading from './page/loading';

interface VideoEmbedProps {
  src: string;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  light?: string;
  controls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

const VideoEmbed: FC<VideoEmbedProps> = ({
  src,
  playing = true,
  light,
  controls = true,
  loop = true,
  muted = false,
  onPlay,
  onPause,
  className,
}) => {
  const videoRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!src) return <Loading />;

  return (
    <div
      ref={containerRef}
      id="video-embed-container"
      className={cn(
        'relative xl:min-h-[104vh] lg:min-h-screen md:min-h-screen min-h-[30vh] w-full overflow-hidden',
        className,
      )}
    >
      <ReactPlayer
        ref={videoRef}
        url={src}
        style={{ position: 'absolute', top: 0, left: 0 }}
        width="100%"
        height="100%"
        loop={loop}
        muted={muted}
        playing={playing || !controls}
        playsinline={playing}
        controls={controls}
        light={light}
        onPlay={onPlay}
        onPause={onPause}
        // pip={isPiPActive}
      />
    </div>
  );
};

export default memo(VideoEmbed);
