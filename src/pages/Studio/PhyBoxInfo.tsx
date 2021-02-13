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
  isFavorites: boolean;
  color: string;
  children: React.ReactElement;
  meshProps?: MeshProps;
}
export function PhyBoxInfo({
  clicked,
  setClicked,
  isFavorites,
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
    scale: clicked ? 1.5 : 0.5,
    rotation: clicked ? [3.14159, 0, 0.785398 + 0.785398] : [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });

  useFrame(() => {
    if (!ref.current) return;
    const { postionY, rotation } = clickAnimation;

    const s = clickAnimation.scale.get();
    ref.current.position.y += postionY.get();

    ref.current.scale.set(s, s, s);

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
          scaleFactor={10}
          center
          style={{
            color: '#FAF470',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              opacity: isFavorites ? 1 : 0,
              transition: 'all 0.5s',
              width: clicked ? '250px' : '100px',
              height: clicked ? '250px' : '100px',
            }}
          >
            ★
          </div>
        </HTML>
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
