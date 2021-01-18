import React from 'react';
// import { MeshProps } from 'react-three-fiber';
import { Plane, Box } from '@react-three/drei';
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
  color: string;
}
export function PhyBox({ color, ...props }: phyBoxProps) {
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
    >
      <meshStandardMaterial color={color} />
    </Box>
  );
}
