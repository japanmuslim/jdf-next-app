import { VideoState } from '../../Home.type';
import { motion } from 'framer-motion';
import VideoThumbnail from './VideoThumbnail';
import useHome from '../../hooks/useHome';

interface Props {
  data: VideoState[];
  onHandleVideo?: (videoId: number) => void;
}

const defaultPosition = [
  [-370, -200],
  [-410, 0],
  [-390, 200],
  [370, -200],
  [410, 0],
  [370, 200],
  [0, 320],
  [0, -320],
];

export default function CanvasVideos(props: Props) {
  const { data, onHandleVideo } = props;
  const { currentCategoryData } = useHome();

  return (
    <motion.div className="w-full flex items-center justify-center">
      <VideoThumbnail
        categoryData={currentCategoryData}
        key={'category-' + currentCategoryData?.id}
      />

      {data?.map((d, index) => {
        return (
          <VideoThumbnail
            key={'video-' + d.id}
            index={index + 1}
            videoData={d}
            position={defaultPosition[index]}
            onHandleVideo={onHandleVideo}
          />
        );
      })}
    </motion.div>
  );
}
