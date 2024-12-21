import { useFrame, Vector3 } from '@react-three/fiber';
import { CategoryVideoProps, VideoState } from '../../Home.type';
import { motion as motion3D } from 'framer-motion-3d';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  data: CategoryVideoProps;
}

interface ThumbnailProps {
  data: VideoState;
  index: number;
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
  const randomX = getRandomNumber(5, 15);
  const randomY = getRandomNumber(0, 7);
  const randomZ = Math.random() * (-6 - 1) + 0;
  const position = [randomX, randomY, randomZ];
  const rotateX = randomX >= 1 ? -25 : randomX <= -1 ? 25 : 0;
  const rotateY = randomY >= 2 ? 25 : randomY <= -2 ? -25 : 0;

  const { data } = props;

  return (
    <motion3D.mesh castShadow position={position as Vector3}>
      <motion3D.planeGeometry args={[1, 1, 1]} />
      <motion3D.meshBasicMaterial
        color={'#fff'}
        transparent={true}
        opacity={0}
      />
      <Html transform distanceFactor={10}>
        {data.thumbnail_url && (
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            }}
            onClick={(e) => console.log(data.video_category_id)}
          >
            <motion.img
              src={data.thumbnail_url || ''}
              alt="Look at mouse"
              style={{ maxHeight: '50px', maxWidth: '100px' }}
            />
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0)', // Transparan secara default
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
    </motion3D.mesh>
  );
}

export default function CategoryScatteredThumbnail(props: Props) {
  const { data } = props;

  return (
    <>
      {data?.videos?.map((d, i) => {
        if (i > 2) return null;
        return <ScatteredThumbnail key={i} data={d} index={i} />;
      })}
    </>
  );
}
