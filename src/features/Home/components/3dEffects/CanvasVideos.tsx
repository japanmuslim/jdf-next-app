import { VideoState } from '../../Home.type';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import VideoThumbnail from './VideoThumbnail';
import useHome from '../../hooks/useHome';

interface Props {
  data: VideoState[];
  onHandleVideo?: (videoId: number) => void;
}

function setThumbnailPosition(dataLength: number) {
  // [x, y]
  const defaultPosition = [
    [-370, -200], 
    [-410, 0], 
    [-390, 200],
    [370, -200],
    [410, 0],
    [370, 200],
    [0, 320],
    [0, -320]
  ];

  for (let i = 0; i < dataLength; i++) {
    defaultPosition.push([200, 200]);
  }

  return defaultPosition;
}

export default function CanvasVideos(props: Props) {
  const { data } = props;
  const router = useRouter();
  const { currentCategoryData } = useHome();

  return (
    <motion.div className="w-full flex items-center justify-center">
      <VideoThumbnail
        categoryData={currentCategoryData}
        key={'category-' + currentCategoryData?.id}
      />

      {data?.map((d, index) => (
        <VideoThumbnail
          key={'video-' + d.id}
          index={index}
          videoData={d}
          position={setThumbnailPosition(data.length)[index - 1]}
        />
      ))}
    </motion.div>
  );
}
