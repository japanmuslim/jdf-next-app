import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const useHome = () => {
  const [step, setStep] = useState<number>(0);
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const handleTogglePlay = useCallback((videoUrl: string) => {
    if (!videoUrl) {
      //   toast('Video URL not found!', {
      //     type: 'error',
      //     theme: 'colored',
      //   });
      setPlayVideo(false);
      setVideoUrl('');
      return;
    }

    setVideoUrl(videoUrl);
    setPlayVideo((prev) => !prev);
  }, []);

  return {
    step,
    playVideo,
    videoUrl,
    handleTogglePlay,
  };
};

export default useHome;
