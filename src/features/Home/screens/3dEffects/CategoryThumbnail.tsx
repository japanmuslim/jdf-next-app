import { Html, Image } from '@react-three/drei';
import { motion as motion3D } from 'framer-motion-3d';
import { useEffect, useRef } from 'react';
import { CategoryVideoProps, VideoState } from '../../Home.type';
import { motion } from 'framer-motion';
import { Vector3 } from '@react-three/fiber';
import { TextureLoader } from 'three';

interface Props {
  data: CategoryVideoProps;
}

export default function CategoryThumbnail(props: Props) {
  const { data } = props;
  
  return (
    <motion3D.mesh
      name={data.category_name}
      onPointerOver={(e) => e.stopPropagation()}
      onPointerOut={(e) => e.stopPropagation()}
      position={data?.position as Vector3}
    > 
      <motion3D.planeGeometry args={[1, 1, 1]} />
      <motion3D.meshBasicMaterial color={'#fff'} transparent={true} opacity={0} />
      <Html transform distanceFactor={10}>
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: 'perspective(300px) rotateX(-10deg)',
          }}
        >
          <motion.img
            src={data.thumbnail}
            alt="Look at mouse"
            style={{ maxHeight: '100px', maxWidth: '100px' }}
          />
          {/* <Image texture={new TextureLoader().load(data.thumbnail)} /> */}
        </motion.div>
      </Html>
    </motion3D.mesh>
  );
}
