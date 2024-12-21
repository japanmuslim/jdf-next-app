import { Html, Image } from '@react-three/drei';
import { motion as motion3D } from 'framer-motion-3d';
import { useEffect, useRef } from 'react';
import { CategoryVideoProps, VideoState } from '../../Home.type';
import { motion } from 'framer-motion';
import { Vector3 } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRouter } from 'next/router';
import useHome from '../../hooks/useHome';

interface Props {
  data: CategoryVideoProps;
  onHandleCategory?: (category: string) => void
}

export default function CategoryThumbnail(props: Props) {
  const { data, onHandleCategory } = props;
  const router = useRouter();
  const { isCategory, isVideo, } = useHome();

  return (
    <motion3D.mesh
      name={data.category_name}
      onPointerOver={(e) => e.stopPropagation()}
      onPointerOut={(e) => e.stopPropagation()}
      position={data?.position as Vector3}
    >
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
          onClick={(e) => onHandleCategory?.(data?.category_name)}
        >
          <motion.img
            src={data.thumbnail}
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
      </Html>
    </motion3D.mesh>
  );
}
