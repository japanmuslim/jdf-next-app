import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import CameraController from './CameraController';
import Thumbnail from './Thumbnail';
import { CategoryVideoProps } from '../../Home.type';

export interface ThumbnailProps {
  id: number | string;
  position: number[];
  text: string;
}

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
      </group>
    </Canvas>
  );
}
