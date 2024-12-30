import { Canvas } from '@react-three/fiber';
import { CategoryVideoProps } from '../../Home.type';
import React, { memo, useEffect, useRef, useState } from 'react';
import CameraController from './CameraController';
import CategoryThumbnail from './CategoryThumbnail';
import CategoryScatteredThumbnail from './CategoryScatteredThumbnail';
import StoreProvider from '@/features/StoreProviders';
import Loading from '@/components/page/loading';
import * as THREE from 'three';
import FallingSakura from '../fallingSakura/FallingSakura';
import LoadingHome from '../../screens/LoadingHome';

interface Props {
  data: CategoryVideoProps[];
  onHandleCategory?: (category: string) => void;
}

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

function CanvasCategories(props: Props) {
  const ref = useRef(null);
  const { data } = props;
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      if (document.readyState === "complete") {
        setIsLoad(false); 
        observer.disconnect();
      }
    });

    observer.observe({ type: "resource", buffered: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isLoad && <LoadingHome />}
      {!isLoad && (
        <div className="h-screen w-screen bg-transparent">
          <FallingSakura />
          <Canvas
            style={{ height: '100vh', width: '100vw' }}
            camera={{ position: [0, 0, 10], fov: 50 }}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            {/* <motion3D.ambientLight intensity={0.5} /> */}
            <CameraController centerRef={ref} />
            <group ref={ref} position={[0, -0.5, 0]}>
              <StoreProvider>
                {data?.map((d: CategoryVideoProps, index) => {
                  return (
                    <CategoryThumbnail
                      key={d.id}
                      data={d}
                      onHandleCategory={props.onHandleCategory}
                      position={defaultPos[index]}
                    />
                  );
                })}
                {data?.map((d: CategoryVideoProps) => {
                  return (
                    <CategoryScatteredThumbnail
                      key={d.id}
                      data={d}
                      onHandleCategory={props.onHandleCategory}
                    />
                  );
                })}
              </StoreProvider>
            </group>
          </Canvas>
        </div>
      )}
    </>
  );
}

export default memo(CanvasCategories);
