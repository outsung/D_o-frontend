import React, { useState, useMemo } from 'react';
import * as THREE from 'three';
import { MeshProps, useFrame } from 'react-three-fiber';
import { HTML } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

import { useBox, BoxProps } from '@react-three/cannon';

import fontJSON from '../../components/Phy/Do Hyeon_Regular';

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
  const font = useMemo(() => {
    const loader = new THREE.FontLoader();
    const f = loader.parse(fontJSON);
    return f;
  }, []);

  const [star, setStar] = useState(false);
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

  const { ...favoritesAnimation } = useSpring({
    scaleSin: isFavorites ? Math.PI : 0,
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });

  useFrame(() => {
    if (!ref.current) return;
    const { postionY, rotation } = clickAnimation;

    const cs = clickAnimation.scale.get();
    const fs = favoritesAnimation.scaleSin.get();
    let s = cs;
    if (fs !== 0) s = -Math.sin(fs) * 0.5 + 0.5;

    ref.current.position.y += postionY.get();

    ref.current.scale.set(s, s, s);

    if (clicked !== undefined) {
      const r = rotation.get();
      ref.current.rotation.set(r[0], r[1], r[2]);
    }

    if (fs >= Math.PI / 2) setStar(true);
    else setStar(false);
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
        {star ? (
          <textGeometry
            onUpdate={(self) => {
              self.center();
            }}
            args={['★', { font, size: 1, height: 0.5 }]}
          />
        ) : (
          <boxBufferGeometry />
        )}

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
