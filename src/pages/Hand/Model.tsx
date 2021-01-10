import React, { useRef, useLayoutEffect } from 'react';
import { Mesh, Group, Object3D } from 'three';
import { useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({
  url,
  landmarks,
}: {
  url: string;
  landmarks: { x: number; y: number; visibility: undefined }[] | undefined;
}) {
  const object = useLoader(GLTFLoader, url);

  const leftHand = object.scene.getObjectByName('mixamorigLeftHand');

  // const leftHandThumb1 = leftHand?.children[0];
  // const leftHandThumb1 = object.scene.getObjectByName(
  //   'mixamorigLeftHandThumb1',
  // );
  // const leftHandThumb1 = object.scene.getObjectByName(
  //   'mixamorigLeftHandThumb1',
  // );
  // const leftHandThumb1 = object.scene.getObjectByName(
  //   'mixamorigLeftHandThumb1',
  // );

  const rightArm = object.scene.getObjectByName('mixamorigRightArm');

  const a = (bb: any, index: number) => {
    if (landmarks) {
      const cX = landmarks[0].x;
      const cY = landmarks[0].y;

      bb.position.x = (landmarks[index].x - cX) * 10;
      bb.position.y = (landmarks[index].y - cY) * 10;
      bb.position.z = landmarks[index].x;
      bb.children[0].position.x = (landmarks[index + 1].x - cX) * 10;
      bb.children[0].position.y = (landmarks[index + 1].y - cY) * 10;
      bb.children[0].position.z = landmarks[index + 1].x;
      bb.children[0].children[0].position.x =
        (landmarks[index + 2].x - cX) * 10;
      bb.children[0].children[0].position.y =
        (landmarks[index + 2].y - cY) * 10;
      bb.children[0].children[0].position.z = landmarks[index + 2].x;
      bb.children[0].children[0].children[0].position.x =
        (landmarks[index + 3].x - cX) * 10;
      bb.children[0].children[0].children[0].position.y =
        (landmarks[index + 3].y - cY) * 10;
      bb.children[0].children[0].children[0].position.z =
        landmarks[index + 3].x;
    }
  };

  useFrame(() => {
    if (landmarks) {
      // landmarks[0].y;
      if (leftHand) {
        leftHand.rotation.z = -1.5708;
        // {
        //   const deltaX = landmarks[5].x - landmarks[17].x;
        //   const deltaY = landmarks[5].y - landmarks[17].y;

        //   const isBack = deltaX < 0;

        //   const k = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        //   // 0.17 ~ 0.1
        //   const nomalizedK = (k - 0.1) / (0.17 - 0.01);

        //   console.log(leftHand, leftHand.children[0].children[0].children[0]);

        //   if (isBack)
        //     leftHand.rotation.x =
        //       3.1416 + (Math.acos(nomalizedK) * 1.5708 - 1.5708);
        //   else
        //     leftHand.rotation.x = 0 - Math.acos(nomalizedK) * 1.5708 + 1.5708;
        // }

        // {
        //   const deltaX = landmarks[5].x - landmarks[0].x;
        //   const deltaY = landmarks[5].y - landmarks[0].y;

        //   const isBack = deltaX < 0;

        //   const k = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        //   // 0.17 ~ 0.1
        //   const nomalizedK = (k - 0.6) / (0.17 - 0.6);

        //   const r = Math.acos(nomalizedK);
        //   // console.log(r);

        //   // leftHand.rotation.z = -1.5708;
        //   leftHand.rotation.z = r ? -1.5708 - r * 0.1 : leftHand.rotation.z;
        //   // else leftHand.rotation.z = 0; // - Math.acos(nomalizedK) * 1.5708 + 1.5708;
        // }

        // 엄지
        const leftHandThumb = leftHand.children[0].children[0];
        {
          const deltaX = landmarks[3].x - landmarks[4].x;
          const deltaY = landmarks[3].y - landmarks[4].y;

          const k = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          // 0.17 ~ 0.1
          const nomalizedK = (k - 0.1) / (0.1 - 0.01);

          console.log(Math.acos(nomalizedK));
          console.log(leftHandThumb);
          leftHandThumb.rotation.x = landmarks[4].x * -1.5708; // Math.acos(nomalizedK);
          // leftHandThumb.position.z = Math.acos(nomalizedK) * 1;
          // if (isBack)
          //   leftHandThumb.rotation.x =
          //     3.1416 + (Math.acos(nomalizedK) * 1.5708 - 1.5708);
          // else
          //   leftHandThumb.rotation.x =
          //     0 - Math.acos(nomalizedK) * 1.5708 + 1.5708;
        }

        // console.log();
        // landmarks[0].x * 10
        //
        // leftHand.position.z = landmarks[0].x * 10 - 5;

        // leftHand.position.z = landmarks[0].x;

        // 검지
        const leftHandIndex = leftHand.children[1];

        // 중지
        const leftHandMiddle = leftHand.children[2];

        // 약지
        const leftHandRing = leftHand.children[3];

        // 새끼
        const leftHandPinky = leftHand.children[4];
      }
      if (rightArm) rightArm.rotation.z += 0.005;
    }
  });

  // console.log(landmarks, leftHand);
  // console.log(landmarks, leftHand);

  return <primitive object={object.scene} />;
}

export default Model;
