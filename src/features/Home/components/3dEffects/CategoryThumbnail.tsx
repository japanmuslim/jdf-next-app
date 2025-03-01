'use client';

import { Html } from '@react-three/drei';
import { CategoryVideoProps } from '../../Home.type';
import { motion } from 'framer-motion';
import { Vector3 } from '@react-three/fiber';
import { useAppDispatch, useAppSelector } from '@/init/store/store';
import { setCategoryId } from '@/services/slice/categoryIdSlicer';

interface Props {
  data: CategoryVideoProps;
  onHandleCategory?: (category: string) => void;
  position: number[];
}

export default function CategoryThumbnail(props: Props) {
  const { data, onHandleCategory, position } = props;
  const dispatch = useAppDispatch();
  const activeId = useAppSelector((state) => state.categorySlice.id);
  
  const onMouseEnter = (e: React.MouseEvent) => {
    dispatch(setCategoryId(data.id));
  };
  const onMouseLeave = (e: React.MouseEvent) => {
    dispatch(setCategoryId(0));
  };
  
  return (
    <mesh
      name={data.category_name}
      onPointerOver={(e) => e.stopPropagation()}
      onPointerOut={(e) => e.stopPropagation()}
      position={position as Vector3}
    >
      <planeGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={'#fff'}
        transparent={true}
        opacity={0}
      />
      <Html transform distanceFactor={10}>
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: 'perspective(300px) rotateX(-15deg)',
          }}
          onClick={(e) => onHandleCategory?.(data?.category_name)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <motion.img
            src={data.thumbnail}
            alt="Look at mouse"
            style={{ maxHeight: '50px', maxWidth: '100px' }}
            loading="lazy"
          />
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: data.id === activeId ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0)', // Transparan secara default
            }}
            whileHover={{
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              cursor: 'pointer',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Html>
    </mesh>
  );
}
