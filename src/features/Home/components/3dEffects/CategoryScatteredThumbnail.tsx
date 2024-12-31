import { useFrame, Vector3 } from '@react-three/fiber';
import { CategoryVideoProps, VideoState } from '../../Home.type';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/init/store/store';
import { setCategoryId } from '@/services/slice/categoryIdSlicer';
import Image from 'next/image';
import { IMG_BLUR } from '@/contants';

interface Props {
  data: CategoryVideoProps;
  onHandleCategory?: (category: string) => void;
}

interface ThumbnailProps {
  data: VideoState;
  index: number;
  // [x, y, z]
  position: number[];
  onHandleCategory?: (category: string) => void;
  category_name: string;
}

function getRandomNumber(min: number, max: number) {
  const randomizer = Math.random();
  if (randomizer < 0.5) {
    return Math.random() * (-min - -max) + -max; // Random between -15 and -5
  } else {
    return Math.random() * (max - min) + min; // Random between 5 and 15
  }
}

function ScatteredThumbnail(props: ThumbnailProps) {
  const { data, position, onHandleCategory, category_name } = props;

  const rotateX = position[0] >= 1 ? -15 : position[0] <= -1 ? 15 : 0;
  const rotateY = position[1] >= 2 ? 15 : position[1] <= -2 ? -15 : 0;
  const dispatch = useAppDispatch();
  const activeId = useAppSelector((state) => state.categorySlice.id);

  const onMouseEnter = (e: React.MouseEvent) => {
    dispatch(setCategoryId(data.video_category_id));
  };
  const onMouseLeave = (e: React.MouseEvent) => {
    dispatch(setCategoryId(0));
  };

  return (
    <mesh castShadow position={position as Vector3}>
      <planeGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={'#fff'} transparent={true} opacity={0} />
      <Html transform distanceFactor={10}>
        {data.thumbnail_url && (
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            }}
            onClick={(e) => onHandleCategory?.(category_name)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Image
              src={data.thumbnail_url || ''}
              alt={data.name_video || 'Video'}
              style={{ maxHeight: '50px', maxWidth: '100px' }}
              loading="lazy"
              width={100}
              height={50}
              onLoad={(e) => {
                e.currentTarget.style.display = 'block';
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor:
                  data.video_category_id === activeId
                    ? `rgba(253, 53, 53, 0.63)`
                    : `rgba(20, 13, 13, ${position[2] / -10 < 0.2 ? 0.3 : position[2] / -10 + 0.2})`,
              }}
              whileHover={{
                backgroundColor: 'rgba(255, 0, 0, 0.5)', // Warna overlay saat hover
                cursor: 'pointer',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </Html>
    </mesh>
  );
}

export default function CategoryScatteredThumbnail(props: Props) {
  const { data, onHandleCategory } = props;
  const maxImage = 2;

  return (
    <>
      {data?.videos?.map((d, i) => {
        if (i > maxImage) return null;
        return (
          <ScatteredThumbnail
            key={i}
            data={d}
            index={i}
            position={[
              getRandomNumber(6, 15),
              getRandomNumber(1, 6),
              Math.random() * (-6 - 1) + 0,
            ]}
            onHandleCategory={onHandleCategory}
            category_name={data.category_name}
          />
        );
      })}
    </>
  );
}
