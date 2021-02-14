import React, { useMemo, useRef, Fragment } from 'react';
import * as THREE from 'three';
import { MeshProps } from 'react-three-fiber';

import {
  useBox,
  usePlane,
  PlaneProps,
  BoxProps,
  useConeTwistConstraint,
} from '@react-three/cannon';

import fontJSON from './Do Hyeon_Regular.js';

/* Plane */
export interface phyPlaneProps extends PlaneProps {
  color?: string;
  meshProps?: MeshProps;
}
export function PhyPlane({ color, meshProps, ...props }: phyPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }));

  return (
    <mesh {...meshProps} ref={ref}>
      <planeBufferGeometry />
      <shadowMaterial attach="material" transparent opacity={0.4} />
      {/* <meshStandardMaterial color={color} /> */}
    </mesh>
  );
}
PhyPlane.defaultProps = { color: undefined, meshProps: undefined };

/* Box */
export interface phyBoxProps extends BoxProps {
  color: string;
  meshProps?: MeshProps;
}
export function PhyBox({ color, meshProps, ...props }: phyBoxProps) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    ...props,
  }));

  return (
    <mesh
      {...meshProps}
      ref={ref}
      onClick={() => api.applyImpulse([5, 0, -5], [0, 0, 0])}
    >
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
PhyBox.defaultProps = { meshProps: undefined };

/* Char */
export interface phyCharProps extends BoxProps {
  char: string;
  size: number;
  height: number;
  color: string;
  meshProps?: MeshProps;
  impulse?: number;

  bodyCallback?: (
    body: React.MutableRefObject<THREE.Object3D | undefined>,
  ) => void;
  boxCallback?: (
    box: React.MutableRefObject<THREE.Vector3 | undefined>,
  ) => void;
}

export function PhyChar({
  char,
  size,
  height,
  color,
  meshProps,
  impulse,
  bodyCallback,
  boxCallback,
  ...props
}: phyCharProps) {
  const font = useMemo(() => {
    const loader = new THREE.FontLoader();
    const f = loader.parse(fontJSON);
    return f;
  }, []);

  const box = useRef<THREE.Vector3>();

  // console.log(box);

  const [ref, api] = useBox(() => ({
    mass: 1,
    ...props,
    args: box.current
      ? [box.current.x, box.current.y, box.current.z]
      : [size, size, height],
  }));

  if (bodyCallback) bodyCallback(ref);
  if (boxCallback) boxCallback(box);

  return (
    <mesh
      {...meshProps}
      ref={ref}
      onClick={() => {
        api.applyImpulse([impulse || 50, 0, -(impulse || 50)], [0, 0, 0]);
      }}
    >
      <textGeometry
        onUpdate={(self) => {
          self.center();
          self.computeBoundingBox();
          box.current = self.boundingBox?.getSize(new THREE.Vector3());
        }}
        args={[char[0], { font, size, height }]}
      />
      <meshStandardMaterial roughness={0.6} color={color} />
    </mesh>
  );
}
PhyChar.defaultProps = {
  meshProps: undefined,
  bodyCallback: undefined,
  boxCallback: undefined,
  impulse: undefined,
};

function ConeTwistConstraint({
  bodyA,
  bodyB,
  boxA,
  boxB,
  wordSpacing,
  size,
}: {
  bodyA: React.MutableRefObject<THREE.Object3D | undefined>;
  bodyB: React.MutableRefObject<THREE.Object3D | undefined>;
  boxA: React.MutableRefObject<THREE.Vector3 | undefined>;
  boxB: React.MutableRefObject<THREE.Vector3 | undefined>;
  size: number;
  wordSpacing: number;
}) {
  // console.log("bodyA", JSON.stringify(bodyA));
  // console.log("bodyB", JSON.stringify(bodyB));
  // console.log("boxA", JSON.stringify(boxA));
  // console.log("boxB", JSON.stringify(boxB));

  const optns = {
    pivotA: [
      (boxA.current?.x || size + wordSpacing) / 2,
      -((boxA.current?.y || size + wordSpacing) / 2),
      0,
    ],
    pivotB: [
      -((boxB.current?.x || size + wordSpacing) / 2),
      -((boxB.current?.y || size + wordSpacing) / 2),
      0,
    ],
    collideConnected: true,
  };

  useConeTwistConstraint(bodyA, bodyB, optns);

  return <></>;
}

/* String */
export interface phyStringProps extends BoxProps {
  string: string;
  size: number;
  height: number;
  color: string;
  wordSpacing: number;
  meshProps?: MeshProps;
}
export function PhyString({
  string,
  size,
  height,
  color,
  meshProps,
  wordSpacing,
  ...props
}: phyStringProps) {
  const bodys: React.MutableRefObject<THREE.Object3D | undefined>[] = [];
  const boxs: React.MutableRefObject<THREE.Vector3 | undefined>[] = [];

  const getBody = (
    body: React.MutableRefObject<THREE.Object3D | undefined>,
  ) => {
    bodys.push(body);
  };
  const getBox = (box: React.MutableRefObject<THREE.Vector3 | undefined>) => {
    boxs.push(box);
  };

  const { position } = props;
  const standardPosition = position || [0, 0, 0];

  const groupCenterX =
    (size * string.length + wordSpacing * (string.length - 1)) / 2;

  // console.log("standardPosition", standardPosition);
  // console.log("groupCenterX", groupCenterX);

  const components = Array.from(string).map((char, i) => {
    const charCenterX = i * size + i * wordSpacing + size / 2;
    // console.log(i, "charCenterX", charCenterX);

    return PhyChar({
      ...props,
      position: [
        standardPosition[0] + charCenterX - groupCenterX,
        standardPosition[1],
        standardPosition[2],
      ],
      color,
      char,
      size,
      height,
      meshProps,
      bodyCallback: getBody,
      boxCallback: getBox,
    });
  });

  return (
    <group>
      {components.map((c, i) => (
        <Fragment key={i}>{c}</Fragment>
      ))}

      {Array.from(string).map((char, i) => (
        <Fragment key={`${char}${i}`}>
          {i !== 0 ? (
            <ConeTwistConstraint
              bodyA={bodys[i - 1]}
              bodyB={bodys[i]}
              boxA={boxs[i - 1]}
              boxB={boxs[i]}
              wordSpacing={wordSpacing}
              size={size}
            />
          ) : (
            <></>
          )}
        </Fragment>
      ))}
    </group>
  );
}
PhyString.defaultProps = { meshProps: undefined };
