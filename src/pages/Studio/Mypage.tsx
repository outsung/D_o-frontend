import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshProps, useFrame, useThree } from 'react-three-fiber';
import { HTML } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

import { MypageBox } from './style';

function randomColorGenerator() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function randomSizeGenerator() {
  return Math.random() + 0.1;
}

export function Mypage({ mypageClicked }: { mypageClicked: boolean }) {
  return (
    <MypageBox className={mypageClicked ? 'on' : ''}>
      <h1>제작중...</h1>
    </MypageBox>
  );
}

interface phyBoxMypageProps extends MeshProps {
  mypageClicked: boolean;
  maxSize: number;
  center: number[];
}

export function PhyBoxMypage({
  mypageClicked,
  maxSize,
  center,
  ...props
}: phyBoxMypageProps) {
  const [hover, setHover] = useState(false);
  const [size, setSize] = useState(randomSizeGenerator());
  const [color, setColor] = useState(randomColorGenerator());

  const htmlRef = useRef({} as HTMLDivElement);
  const ref = useRef({} as THREE.Mesh);

  const timeoutHandle = useRef<NodeJS.Timeout>();

  const reset = () => {
    setSize(0);
    timeoutHandle.current = setTimeout(() => {
      setSize(randomSizeGenerator());
      setColor(randomColorGenerator());
      timeoutHandle.current = undefined;
    }, 1000);
  };

  const { scale } = useSpring({
    scale: mypageClicked ? size : 0,
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });
  const { viewport } = useThree();
  useFrame((state) => {
    htmlRef.current.style.left = `${
      state.mouse.x * viewport.width * 50 + center[0]
    }px`;
    htmlRef.current.style.bottom = `${
      state.mouse.y * viewport.height * 50 + center[1]
    }px`;

    const s = scale.get();
    ref.current.scale.set(s, s, s);
    ref.current.rotation.x += 0.0008;
    ref.current.rotation.y += 0.008;
  });

  useEffect(
    () => () => {
      if (timeoutHandle.current) clearTimeout(timeoutHandle.current);
    },
    [],
  );

  return (
    <animated.mesh
      {...props}
      ref={ref}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => {
        if (timeoutHandle.current) return;

        setHover(false);

        if (size > maxSize) reset();
        else setSize(size + 0.1);
      }}
    >
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
      <HTML style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div
          ref={htmlRef}
          style={{
            position: 'absolute',
            color: '#FCDB7E',
            fontWeight: 'bold',
            opacity: hover ? 1 : 0,
            transition: 'all 0.01s',
          }}
        >
          click!
        </div>
      </HTML>
    </animated.mesh>
  );

  // <PhyBox position={[0, -5, 0]} type="Static" color="red" />;
}
