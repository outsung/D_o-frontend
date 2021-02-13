import React from 'react';
import { useFrame } from 'react-three-fiber';
import { useSpring } from '@react-spring/three';

type cameraAnimationProps = {
  optionClicked: boolean;
  boxClicked: string | undefined;
};

function CameraAnimation({ optionClicked, boxClicked }: cameraAnimationProps) {
  const { option, box } = useSpring({
    option: optionClicked ? [-12] : [0],
    box: boxClicked ? [12] : [0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });

  useFrame((state) => {
    const [postionX] = option.get();
    const [postionY] = box.get();

    state.camera.position.x = postionX + -5;
    state.camera.position.y = postionY + 3;
  });

  return <></>;
}

export default CameraAnimation;
