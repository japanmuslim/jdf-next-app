import { Canvas } from '@react-three/fiber';
import { motion as motion3D } from 'framer-motion-3d';
import { CategoryVideoProps } from '../../Home.type';
import { useRef, useState } from 'react';
import CameraController from './CameraController';
import CategoryThumbnail from './CategoryThumbnail';
import CategoryScatteredThumbnail from './CategoryScatteredThumbnail';

interface Props {
  data: CategoryVideoProps[];
  isLoading?: boolean;
  onHandleCategory?: (category: string) => void;
}

function setPosition(data: CategoryVideoProps[]) {
  const defaultPos: number[][] = [
    [-2.7, 1.8, 1],
    [0, 1.8, 1],
    [2.7, 1.8, 1],
    [-2.7, 0, 1],
    [0, 0, 1],
    [2.7, 0, 1],
    [-1.3, -1.8, 1],
    [1.3, -1.8, 1],
  ];

  return data?.map((d, i) => ({
    position: defaultPos[i],
    ...d,
  }));
}

export default function CanvasCategories(props: Props) {
  const ref = useRef(null);
  const { data } = props;
  const [dataWithPosition, setDataWithPosition] = useState(setPosition(data));

  return (
    <Canvas
      style={{ height: '100vh', width: '100vw' }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <motion3D.ambientLight intensity={0.5} />
      <motion3D.fog attach="fog" args={['#191920', 0, 15]} />
      <CameraController centerRef={ref} />
      <motion3D.group
        ref={ref}
        position={[0, -0.5, 0]}
        onClick={
          (e) => e.stopPropagation()
          // setLocation(
          //   clicked.current === e.object ? '/' : '/item/' + e.object.name,
          // )
        }
        onPointerMissed={() => {} /* setLocation('/') */}
      >
        {dataWithPosition?.map((d: CategoryVideoProps) => {
          return <CategoryThumbnail key={d.id} data={d} onHandleCategory={props.onHandleCategory} />;
        })}
        {dataWithPosition?.map((d: CategoryVideoProps) => {
          return <CategoryScatteredThumbnail key={d.id} data={d} />;
        })}
      </motion3D.group>
      {/* </motion3D.group> */}
    </Canvas>
  );
}
