import { motion } from 'framer-motion';
import { CategoryVideoProps, VideoState } from '../../Home.type';

interface Props {
  videoData?: VideoState;
  categoryData?: CategoryVideoProps;
  position?: number[];
  index?: number;
}

export default function VideoThumbnail(props: Props) {
  const { videoData, categoryData, position, index } = props;
  if (categoryData) {
    return (
      <motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            textAlign: 'center',
            marginBottom: '3em',
            fontSize: '2em',
            fontWeight: 'bold',
          }}
        >
          {categoryData?.category_name}
        </motion.div>
        <motion.img
          src={categoryData?.thumbnail}
          alt="Look at mouse"
          style={{ maxHeight: '350px', maxWidth: '350px' }}
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
        />
      </motion.div>
    );
  }

  if (videoData && position && index) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, x: position[0], y: position[1] }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          maxWidth: '250px',
          maxHeight: '300px',
          borderRadius: '10px',
        }}
      >
        <motion.img
          src={videoData?.thumbnail_url}
          alt={videoData?.name_video}
        />
      </motion.div>
    );
  }

  return <div></div>;
}
