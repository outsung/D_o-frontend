import React, { useState } from 'react';
// import * as THREE from 'three';
import { MeshProps, useFrame } from 'react-three-fiber';
import { HTML } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

import { useBox, BoxProps } from '@react-three/cannon';

/* BoxInfo */
export interface phyBoxInfoProps extends BoxProps {
  clicked: string | undefined;
  setClicked: (idx: string) => void;
  color: string;
  children: React.ReactElement;
  meshProps?: MeshProps;
}
export function PhyBoxInfo({
  clicked,
  setClicked,
  color,
  children,
  meshProps,
  ...props
}: phyBoxInfoProps) {
  const [hovered, setHover] = useState(false);
  const [hoveredHTML, setHoveredHTML] = useState(false);

  const [ref] = useBox(() => ({
    mass: clicked ? 1000 : 1,
    ...props,
  }));

  const { ...clickAnimation } = useSpring({
    postionY: clicked ? 12 : 0,
    scale: clicked ? [1.5, 1.5, 1.5] : [0.5, 0.5, 0.5],
    rotation: clicked ? [3.14159, 0, 0.785398 + 0.785398] : [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });

  useFrame(() => {
    if (!ref.current) return;
    const { postionY, scale, rotation } = clickAnimation;

    ref.current.position.y += postionY.get();

    const s = scale.get();
    ref.current.scale.set(s[0], s[1], s[2]);

    if (clicked !== undefined) {
      const r = rotation.get();
      ref.current.rotation.set(r[0], r[1], r[2]);
    }
  });

  return (
    <>
      <animated.mesh
        {...meshProps}
        ref={ref}
        onClick={() => {
          setClicked(clicked ? '' : children.props._id);
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxBufferGeometry />
        <meshStandardMaterial color={color} />
        <HTML
          style={{
            display:
              clickAnimation.postionY.get() < 0.001 &&
              !clicked &&
              (hovered || hoveredHTML)
                ? 'block'
                : 'none',
          }}
        >
          <div
            onPointerEnter={() => setHoveredHTML(true)}
            onPointerLeave={() => setHoveredHTML(false)}
          >
            {children}
          </div>
        </HTML>
      </animated.mesh>
    </>
  );
}
PhyBoxInfo.defaultProps = { meshProps: undefined };
