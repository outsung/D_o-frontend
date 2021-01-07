import React, { useState, useMemo } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function Model({
  OBJUrl,
  MTLUrl,
  IMGUrl,
}: {
  OBJUrl: string;
  MTLUrl: string;
  IMGUrl: string;
}) {
  // const OBJset = (group: Group) => {
  //   console.log('group: ', group);
  //   setObj(group);
  // };
  // const MTLset = (group: MTLLoader.MaterialCreator) => {
  //   console.log('group: ', group);
  //   setMaterial(group);
  // };
  // useMemo(() => {
  //   new OBJLoader().load(OBJUrl, OBJset);
  //   new MTLLoader().load(OBJUrl, MTLset);
  // }, [OBJUrl, MTLUrl]);

  // return obj ? <primitive object={obj} /> : null;

  // const materials = useLoader(MTLLoader, MTLUrl);
  // const object = useLoader(OBJLoader, OBJUrl, (loader) => {
  //   materials.preload();
  //   loader.setMaterials(materials);
  // });

  const materials = useLoader(MTLLoader, MTLUrl);
  const object = useLoader(OBJLoader, OBJUrl, (loader: any) => {
    // texture.preload();
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <mesh>
      <primitive object={object} color="#000">
        <meshBasicMaterial
          attach="material"
          color="blue"
          opacity={0.3}
          transparent
        />
      </primitive>
    </mesh>
  );
}

export default Model;

/*
import React, { Suspense, useMemo, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, useHelper, softShadows, Stats } from 'drei';
import {
  CameraHelper,
  DirectionalLightHelper,
  PointLightHelper,
  SpotLightHelper,
  Mesh,
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
} from 'three';

import billboard from '../assets/models/billboard.obj';
import bridge from '../assets/models/bridge.obj';

const ShadowedModel = ({ modelPath }) => {
  const [obj, setObj] = useState();
  useMemo(() => new OBJLoader().load(modelPath, setObj), [modelPath]);
  if (obj) {
    obj.castShadow = true;
    obj.receiveShadow = true;
    obj.traverse((children) => {
      if (children instanceof Mesh) {
        children.castShadow = true;
        children.receiveShadow = true;
      }
    });
  }
  return obj ? <primitive object={obj} /> : null;
};

const Lights = () => {
  const refLight1 = useRef();
  const refLight2 = useRef();
  const refLight3 = useRef();
  const refLight4 = useRef();
  useHelper(refLight1, PointLightHelper, 5);
  useHelper(refLight2, PointLightHelper, 5);
  useHelper(refLight3, DirectionalLightHelper, 5);
  useHelper(refLight4, SpotLightHelper, 5);

  return (
    <>
      <ambientLight intensity={0.1} />
      {/* <directionalLight
        ref={refLight3}
        castShadow
        position={[50, 20, 80]}
        intensity={0.5}
        shadow-mapSize-shadowMapWidth={2048}
        shadow-mapSize-shadowMapHeight={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={-50}
        shadow-camera-bottom={10}
      /> }
      <spotLight
        ref={refLight4}
        castShadow
        position={[-50, 50, 20]}
        intensity={0.5}
        shadow-mapSize-shadowMapWidth={2048}
        shadow-mapSize-shadowMapHeight={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={-50}
        shadow-camera-bottom={50}
      />
      <pointLight ref={refLight1} position={[10, -10, -20]} intensity={0.3} />
      <pointLight ref={refLight2} position={[0, 10, 5]} intensity={0.3} />
      <spotLight intensity={1} position={[0, 1000, 0]} />
    </>
  );
};

const Billboard = () => {
  return (
    <mesh
      castShadow
      position={[-15, 5, -35]}
      scale={[0.05, 0.05, 0.05]}
      rotation={[0, 20, 0]}
    >
      <Model modelPath={billboard} />
    </mesh>
  );
};

const Bridge = () => {
  return (
    <mesh
      castShadow
      receiveShadow
      position={[10, -40, -80]}
      // position={[-80, -40, -150]}
      scale={[0.15, 0.15, 0.15]}
      rotation={[0, 10.2, 0]}
    >
      <ShadowedModel modelPath={bridge} />
    </mesh>
  );
};

const Shadow = () => {
  return (
    <group>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-20, -32, -40]}
      >
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        {/* <shadowMaterial attach="material" opacity={0.5} /> }
        <meshLambertMaterial attach="material" color={'lightblue'} />
      </mesh>
    </group>
  );
};

const Sphere = () => {
  const { scene, gl } = useThree();
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });
  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 100, 0);
  scene.add(cubeCamera);

  useFrame(() => cubeCamera.update(gl, scene));

  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshBasicMaterial
        attach="material"
        envMap={cubeCamera.renderTarget.texture}
        color="white"
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  );
};

const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    frontImg,
    backImg,
    upImg,
    downImg,
    rightImg,
    leftImg,
  ]);
  scene.background = texture;
  return null;
};

const MegatronModel = () => {
  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <OrbitControls
          enablePan={Boolean('Pan', true)}
          enableZoom={Boolean('Zoom', true)}
          enableRotate={Boolean('Rotate', true)}
        />
        <PerspectiveCamera position={[0, 0, 5]} fov={60} />
        <Stats />
        {/* <Sphere /> }
        <axesHelper />
        <SkyBox />
        <Shadow />
        <Suspense fallback={null}>
          <Bridge />
        </Suspense>
        <Billboard />
        <Lights />
      </Canvas>
    </>
  );
};

export default MegatronModel;
*/
