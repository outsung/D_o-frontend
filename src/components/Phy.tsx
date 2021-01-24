import React, { useState } from 'react';
// import { MeshProps } from 'react-three-fiber';
import { Plane, Box, HTML } from '@react-three/drei';
import {
  useBox,
  usePlane,
  PlaneProps,
  BoxProps,
  // useSphere,
} from '@react-three/cannon';

// import TextGeometry from './TextGeometry';

export function PhyPlane({ ...props }: PlaneProps) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <Plane args={[1000, 1000]} ref={ref}>
      <meshStandardMaterial visible={false} />
    </Plane>
  );
}

interface phyBoxProps extends BoxProps {
  email: string;
  color: string;
}
export function PhyBox({ email, color, ...props }: phyBoxProps) {
  const [hovered, setHover] = useState(false);
  const [ref, api] = useBox(() => ({
    args: [0.5, 0.5, 0.5],
    mass: 1,
    ...props,
  }));

  return (
    <Box
      receiveShadow
      castShadow
      args={[0.5, 0.5, 0.5]}
      ref={ref}
      onClick={() => api.applyImpulse([5, 0, -5], [0, 0, 0])}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={hovered ? 1 : 0.3}
      />
      <HTML
        scaleFactor={10}
        style={{ pointerEvents: 'none', display: hovered ? 'block' : 'none' }}
      >
        <div className="content">id : {email}</div>
      </HTML>
    </Box>
  );
}
