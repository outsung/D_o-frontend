import React, { useMemo } from 'react';
import * as THREE from 'three';
import { MeshProps } from 'react-three-fiber';
import { useBox } from '@react-three/cannon';

import fontJSON from './Do Hyeon_Regular.js';

interface textGeometryProps extends MeshProps {
  text: string;
  size: number;
  height: number;
  color: string;
}

function TextGeometry({
  text,
  size,
  height,
  color,
  ...args
}: textGeometryProps) {
  const font = useMemo(() => {
    const loader = new THREE.FontLoader();
    const f = loader.parse(fontJSON);
    return f;
  }, []);

  const geometry = new THREE.TextGeometry(text, {
    font,
    size,
    height,
  });

  // D
  useBox(() => ({
    position: [-1.9, 1.4, height / 2],
    args: [2, 2.9, height],
    type: 'Static',
  }));
  // ?
  useBox(() => ({
    position: [height - 0.15, 1.4, height / 2],
    args: [height, 2.9, height],
    type: 'Static',
  }));
  // o
  useBox(() => ({
    position: [2.2, 1.4, height / 2],
    args: [1.8, 2.9, height],
    type: 'Static',
  }));

  return (
    <mesh {...args} geometry={geometry}>
      <meshStandardMaterial roughness={0.6} attach="material" color={color} />
    </mesh>
  );
}

export default TextGeometry;
