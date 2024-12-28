import { motion } from 'framer-motion';
import { CategoryVideoProps, VideoState } from '../../Home.type';
import { IoPlay } from 'react-icons/io5';

interface Props {
  videoData?: VideoState;
  categoryData?: CategoryVideoProps;
  position?: number[];
  index?: number;
  onHandleVideo?: (videoId: number) => void;
}

export default function VideoThumbnail(props: Props) {
  const { videoData, categoryData, position, index, onHandleVideo } = props;
  if (categoryData) {
    return (
      <motion.div className="absolute">
        <motion.img
          src={categoryData?.thumbnail}
          alt="Look at mouse"
          style={{
            maxHeight: '350px',
            maxWidth: '350px',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1 * 0.1,
            ease: 'easeInOut',
            objectFit: 'cover',
            border: '2px solid #fff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}
          loading="lazy"
        />
      </motion.div>
    );
  }

  if (videoData && position && index) {
    return (
      <motion.div
        style={{
          position: 'absolute',
          maxWidth: '250px',
          maxHeight: '300px',
          borderRadius: '10px',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, x: position[0], y: position[1] }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: 'easeInOut',
        }}
      >
        <motion.img
          src={videoData?.thumbnail_url || ''}
          alt={videoData?.name_video || ''}
          style={{
            objectFit: 'cover',
            perspective: '1000px',
            zIndex: 99,
          }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <motion.div
          className="grid-card-item-overlay"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => onHandleVideo?.(videoData?.id)}
        >
          <div className="flex flex-col items-center justify-center h-full relative w-full hover:cursor-pointer">
            <button className="md:p-4 p-1 rounded-full hover:bg-primary/80 hover:-translate-y-2 duration-300 transition-all hover:shadow shadow-lg">
              <IoPlay className="md:text-3xl text-xs text-white" />
            </button>
            <h3 className="md:text-lg text-[8px] font-medium text-white absolute inset-x-0 md:bottom-3 bottom-1 w-full text-center">
              {videoData?.name_video || ''}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return <div></div>;
}
