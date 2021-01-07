import React, { useState, useMemo, useRef } from 'react';
import { RGBAFormat, WebGLCubeRenderTarget, CubeCamera, Material } from 'three';
import { useFrame, useResource } from 'react-three-fiber';
import { RoundedBox, Html, Box } from '@react-three/drei';

import Model from '../../components/Model';

import Login from '../Login';

const OBJURL = `${process.env.PUBLIC_URL}/model/TV_old_obj.obj`;
const MTLURL = `${process.env.PUBLIC_URL}/model/TV_old_obj.mtl`;
const IMGURL = `${process.env.PUBLIC_URL}/model/screen.jpg`;

function useRenderTarget(settings = {}) {
  const renderTarget = useMemo(() => {
    const renderTargetSettings = {
      format: RGBAFormat,
      generateMipmaps: true,
    };

    return new WebGLCubeRenderTarget(1024, {
      ...renderTargetSettings,
      ...settings,
    });
  }, [settings]);

  const cubeCamera = useRef({} as CubeCamera);

  useFrame(({ gl, scene }) => {
    if (!cubeCamera.current.update) return;
    cubeCamera.current.update(gl, scene);
  });

  return { cubeCamera, renderTarget };
}

function Tv() {
  const { cubeCamera, renderTarget } = useRenderTarget();
  const [screenHover, setScreenHover] = useState(false);
  const [isAfk, setIsAfk] = useState(true);
  // const Click
  const htmlMaterial = useResource<Material>();

  const screenClick = () => setIsAfk(!isAfk);
  const screenPointerOver = () => setScreenHover(true);
  const screenPointerOut = () => setScreenHover(false);

  return (
    <>
      {/* hidden */}
      <group position={[0, 6, 0]} layers={[11]}>
        <Box layers={[11]} />
      </group>
      <cubeCamera
        layers={[11]}
        ref={cubeCamera}
        args={[0.1, 100, renderTarget]}
        position={[0, 6, 5]}
      />

      {/* visible */}
      <group layers={[0]}>
        <mesh position={[0, -0.0001, 0]} rotation={[-1.5708, 0, 0]}>
          <planeBufferGeometry attach="geometry" args={[10, 10]} />
          <meshPhongMaterial attach="material" color="#FFF1FF" />
        </mesh>
        <mesh position={[5, 2.5, 0]} rotation={[0, -1.5708, 0]}>
          <planeBufferGeometry attach="geometry" args={[10, 5]} />
          <meshPhongMaterial attach="material" color="#FFF1FF" />
        </mesh>
        <mesh position={[-5, 2.5, 0]} rotation={[0, 1.5708, 0]}>
          <planeBufferGeometry attach="geometry" args={[10, 5]} />
          <meshPhongMaterial attach="material" color="#FFF1FF" />
        </mesh>
        <mesh position={[0, 2.5, -5]} rotation={[0, 0, 0]}>
          <planeBufferGeometry attach="geometry" args={[10, 5]} />
          <meshPhongMaterial attach="material" color="#FFF1FF" />
        </mesh>
        <mesh position={[0, 5, 0]} rotation={[1.5708, 0, 0]}>
          <planeBufferGeometry attach="geometry" args={[10, 10]} />
          <meshPhongMaterial attach="material" color="#FFF1FF" />
        </mesh>
      </group>

      <group
        layers={[0]}
        position={[1.05, -4.45, 1]}
        scale={[0.01, 0.01, 0.01]}
        rotation={[0, -1.5708, 0]}
      >
        <Model MTLUrl={MTLURL} OBJUrl={OBJURL} IMGUrl={IMGURL} />
      </group>
      <meshLambertMaterial
        ref={htmlMaterial}
        // map={thinFilmFresnel ? thinFilmFresnelMap : undefined}
        envMap={renderTarget.texture}
        color="#FFFFFF"
      />
      <RoundedBox
        layers={[0]}
        onPointerOver={screenPointerOver}
        onPointerOut={screenPointerOut}
        onClick={screenClick}
        args={[4, 4, 4]} // Width, Height and Depth of the box
        position={[-0.325, 1, 0.27]}
        rotation={[1, -1.5708, 0]}
        radius={2} // Border-Radius of the box
        smoothness={100} // Optional, number of subdivisions
        material={htmlMaterial.current}
        // {}
        // {...meshProps} // All THREE.Mesh props are valid
      >
        <Html center>{isAfk ? <></> : <Login />}</Html>
        {/* <meshPhongMaterial
          attach="material"
          map={renderTarget.texture}
          // color={screenHover ? '#FFFFFF' : '#3d3d3d'}
        /> */}
      </RoundedBox>
    </>
  );
}

export default Tv;
