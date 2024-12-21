import { Vector3 } from '@react-three/fiber';
import { CategoryVideoProps, VideoState } from '../../Home.type';
import { motion as motion3D } from 'framer-motion-3d';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

interface Props {
  data: CategoryVideoProps;
}

interface ThumbnailProps {
  data: VideoState;
  index: number;
}

function ScatteredThumbnail(props: ThumbnailProps) {
  const randomX = Math.random() * (15 - -15) + -15; // Random between -15 and 15
  const randomY = Math.random() * (7 - -7) + -7; // Random between -10 and 10
  const randomZ = Math.random() * (-3 - -10) + -10; // Random between -20 and -5

  const { data } = props;
  const position = [randomX, randomY, randomZ];

  return (
    <motion3D.mesh castShadow position={position as Vector3}>
      <motion3D.planeGeometry args={[1, 1, 1]} />
      <motion3D.meshBasicMaterial
        color={'#fff'}
        transparent={true}
        opacity={0}
      />
      <Html transform distanceFactor={10}>
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: 'perspective(300px) rotateX(-10deg)',
          }}
        >
          <motion.img
            src={data.thumbnail_url}
            alt="Look at mouse"
            style={{ maxHeight: '50px', maxWidth: '100px' }}
          />
          {/* <Image texture={new TextureLoader().load(data.thumbnail)} /> */}
        </motion.div>
      </Html>
    </motion3D.mesh>
  );
}

export default function CategoryScatteredThumbnail(props: Props) {
  const { data } = props;

  return (
    <>{data?.videos?.map((d, i) => <ScatteredThumbnail key={i} data={d} index={i} />)}</>
  );
}
