import { Html } from '@react-three/drei';
import { useLoader, Vector3 } from '@react-three/fiber';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CategoryVideoProps } from '../../Home.type';
import * as THREE from 'three';
import { useEffect, useState } from 'react';

interface ThumbnailProps {
  data: CategoryVideoProps;
}

export default function Thumbnail(props: ThumbnailProps) {
  // const { position, text } = props;
  const { data } = props;

  return (
    <mesh castShadow position={data?.position as Vector3}>
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
          <motion.img src={data?.thumbnail} alt="Look at mouse" />
          {/* {data?.category_name} */}
        </motion.div>
      </Html>
    </mesh>
  );
}
