import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Vector2, Group, Object3DEventMap } from 'three';

interface CameraControllerProps {
  centerRef: React.RefObject<Group<Object3DEventMap>>;
}

export default function CameraController({ centerRef }: CameraControllerProps) {
  const mouse = useRef(new Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = -(event.clientX / window.innerWidth) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    const targetX = mouse.current.x * 1.5; // Mouse controls horizontal movement

    // Smooth camera movement
    camera.position.x += (targetX - camera.position.x) * 0.06;

    camera.lookAt(0, 0, 5);

    if (centerRef.current) {
      centerRef.current.position.x = mouse.current.x * 1; // Move opposite to mouse X
    }
  });

  return null;
}
