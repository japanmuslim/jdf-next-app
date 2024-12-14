import { Canvas, Vector3 } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import CameraController from './CameraController';
import Thumbnail from './Thumbnail';
import { CategoryVideoProps, VideoState } from '../../Home.type';
import { motion } from 'framer-motion';
import { Html } from '@react-three/drei';

interface Props {
  data: CategoryVideoProps[];
}

function setPosition(data: CategoryVideoProps[]) {
  const defaultPos = [
    [-3, 2, 0],
    [0, 2, 0],
    [3, 2, 0],
    [-3, 0, 0],
    [0, 0, 0],
    [3, 0, 0],
    [-1.5, -2, 0],
    [1.5, -2, 0],
  ];

  return data?.map((d, i) => ({
    position: defaultPos[i],
    ...d,
  }));
}

export default function CanvasScene(props: Props) {
  const { data } = props;
  const centerRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null!);
  const [dataWithPosition, setDataWithPosition] = useState(setPosition(data));

  return (
    <Canvas
      style={{ height: '100vh', width: '100vw' }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <CameraController centerRef={centerRef} />
      <group ref={centerRef}>
        {dataWithPosition?.map((d, i) => <Thumbnail key={i} data={d} />)}
        {dataWithPosition?.map((d, i) => <SubThumbnail key={i} data={d} />)}
      </group>
    </Canvas>
  );
}

interface RandomThumbnailProps {
  data: VideoState;
  index: number;
}
function RandomThumbnail(props: RandomThumbnailProps) {
  // const randomX = Math.random() * (maxX - minX) + minX;
  // const randomY = Math.random() * (maxY - minY) + minY;
  // const randomZ = Math.random() * (maxZ - minZ) + minZ;
  const randomX = Math.random() * (15 - -15) + -15; // Random between -15 and 15
  const randomY = Math.random() * (7 - -7) + -7; // Random between -10 and 10
  const randomZ = Math.random() * (-5 - -15) + -15; // Random between -20 and -5

  console.log(randomY);

  const { data, index } = props;
  const position = [randomX, randomY, randomZ];

  return (
    <mesh castShadow position={position as Vector3}>
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
          <motion.img src={data?.thumbnail_url} alt="Look at mouse" />
          {/* {data?.category_name} */}
        </motion.div>
      </Html>
    </mesh>
  );
}

function SubThumbnail(props: { data: CategoryVideoProps }) {
  const { data } = props;
  return (
    <>
      {data?.videos?.map((d, i) => (
        <RandomThumbnail key={i} data={d} index={i} />
      ))}
    </>
  );
}
