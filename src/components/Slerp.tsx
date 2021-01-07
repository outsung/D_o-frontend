import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';

type slerpProps = {
  children: React.ReactNode;
};

function Slerp({ children, ...args }: slerpProps) {
  const group = useRef<THREE.Group>();
  const { viewport } = useThree();

  const [rotationEuler, rotationQuaternion] = useMemo(
    () => [new THREE.Euler(0, 0, 0), new THREE.Quaternion(0, 0, 0, 0)],
    [],
  );

  useFrame(({ mouse }) => {
    if (!group.current) return;

    // console.log(group.current.quaternion);

    const x = (mouse.x * viewport.width) / 200;
    const y = -(mouse.y * viewport.height) / 200;

    rotationEuler.set(y, x, 0);
    rotationQuaternion.setFromEuler(rotationEuler);
    group.current.quaternion.slerp(rotationQuaternion, 0.1);
  });

  return (
    <group {...args} ref={group}>
      {children}
    </group>
  );
}

export default Slerp;
