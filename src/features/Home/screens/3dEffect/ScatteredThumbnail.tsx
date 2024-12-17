import { CategoryVideoProps, VideoState } from '../../Home.type';
import { motion } from 'framer-motion';
import { Html } from '@react-three/drei';
import { motion as motion3D } from 'framer-motion-3d';
import { useLoader, Vector3 } from '@react-three/fiber';
import { TextureLoader } from 'three';

interface ScatteredThumbnailProps {
  data: CategoryVideoProps;
}

interface ThumbnailProps {
  data: VideoState;
  index: number;
}

function Thumbnail(props: ThumbnailProps) {
  const randomX = Math.random() * (15 - -15) + -15; // Random between -15 and 15
  const randomY = Math.random() * (7 - -7) + -7; // Random between -10 and 10
  const randomZ = Math.random() * (-5 - -15) + -15; // Random between -20 and -5

  console.log(randomY);

  const { data, index } = props;
  const position = [randomX, randomY, randomZ];

  return (
    <motion3D.mesh castShadow position={position as Vector3}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={'#fff'} transparent={true} opacity={0} />

      <Html center transform scale={[0.05, 0.05, 0.04]} distanceFactor={10}>
        <motion.div
          // whileHover={{ scale: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <motion.img
            src={data?.thumbnail_url}
            style={{
                translate: `rotate(${index * 50}deg)`,
            }}
          />
          {/* {data?.category_name} */}
        </motion.div>
      </Html>
    </motion3D.mesh>
  );
}

export default function ScatteredThumbnail(props: ScatteredThumbnailProps) {
  const { data } = props;
  return (
    <>{data?.videos?.map((d, i) => <Thumbnail key={i} data={d} index={i} />)}</>
  );
}
