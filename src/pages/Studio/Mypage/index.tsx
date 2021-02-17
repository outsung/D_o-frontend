import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MeshProps, useFrame, useThree } from 'react-three-fiber';
import { HTML } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

import Illusion from '../../../utils/Illusion';

import {
  MypageBox,
  MypageCategory,
  MypageTitle,
  MypageFieldBox,
  MypageFieldImageBox,
  MypageFieldImage,
  MypageFieldText,
  MypageFieldInput,
  MypageFieldItem,
  MypageFieldItemLabel,
  MypageFieldItemText,
  MypageFieldItemSelect,
  MypageFieldItemUndefined,
} from './style';

import { getByJwt, allgetRes, patchUser } from '../../../container/users';

function randomColorGenerator() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function randomSizeGenerator() {
  return Math.random() + 0.1;
}

const TEST =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8d66f61f-4cde-446b-8046-170777277cd9/outsung.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210216T105108Z&X-Amz-Expires=86400&X-Amz-Signature=9abea07855cccd82aa1623cb1a22520d092eff97b4b09c52b27a4110ae74ada8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22outsung.png%22';

export function useMypage() {
  const [me, setMe] = useState<allgetRes>();
  const [newMe, setNewMe] = useState(me);

  const init = async () => {
    setMe(await getByJwt());
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (me)
      setNewMe({
        ...me,
        age: Number(me.age) || 0,
        gender: me.gender || '비공개',
        mic: me.mic || '없음',
      });
  }, [me]);

  const changeNewMe = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (newMe)
      setNewMe({ ...newMe, [name]: name === 'age' ? Number(value) : value });
  };

  const onSaveNewMe = async (callback: () => void) => {
    if (!newMe || !me) return;

    const req = {
      age: newMe.age !== me.age ? newMe.age : undefined,
      gender: newMe.gender !== me.gender ? newMe.gender : undefined,
      mic: newMe.mic !== me.mic ? newMe.mic : undefined,
      nickname: newMe.nickname !== me.nickname ? newMe.nickname : undefined,
    };

    if (req.age || req.gender || req.mic || req.nickname) {
      const res = await patchUser(req);
      if (res && res.result === 1) setMe(res);
    }

    callback();
  };
  const onCancelNewMe = async (callback: () => void) => {
    if (me)
      setNewMe({
        ...me,
        age: Number(me.age) || 0,
        gender: me.gender || '비공개',
        mic: me.mic || '없음',
      });

    callback();
  };

  return { me, newMe, changeNewMe, onSaveNewMe, onCancelNewMe };
}

type mypageProps = {
  newMe: allgetRes | undefined;
  changeNewMe: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  mypageClicked: boolean;
};
export function Mypage({ newMe, changeNewMe, mypageClicked }: mypageProps) {
  return (
    <MypageBox className={mypageClicked ? 'on' : ''}>
      {newMe ? (
        <>
          <MypageCategory>
            <MypageTitle>계정 설정</MypageTitle>
            <MypageFieldBox className="main-info">
              <MypageFieldImageBox>
                <MypageFieldImage url={TEST} />
              </MypageFieldImageBox>

              <MypageFieldText>{newMe.id}</MypageFieldText>
            </MypageFieldBox>
            <MypageFieldBox className="info">
              <MypageFieldItem>
                <MypageFieldItemLabel>나이</MypageFieldItemLabel>
                <Illusion>
                  <MypageFieldItemSelect
                    name="age"
                    value={newMe.age}
                    onChange={changeNewMe}
                  >
                    {Array.from(Array(100).keys()).map((o, k) => (
                      <option key={k} value={o}>
                        {o}
                      </option>
                    ))}
                  </MypageFieldItemSelect>
                </Illusion>
              </MypageFieldItem>
              <MypageFieldItem>
                <MypageFieldItemLabel>성별</MypageFieldItemLabel>
                <Illusion>
                  <MypageFieldItemSelect
                    name="gender"
                    value={newMe.gender}
                    onChange={changeNewMe}
                  >
                    {['여자', '남자', '비공개'].map((o, k) => (
                      <option key={k} value={o}>
                        {o}
                      </option>
                    ))}
                  </MypageFieldItemSelect>
                </Illusion>
              </MypageFieldItem>
              <MypageFieldItem>
                <MypageFieldItemLabel>마이크</MypageFieldItemLabel>
                <Illusion>
                  <MypageFieldItemSelect
                    name="mic"
                    value={newMe.mic}
                    onChange={changeNewMe}
                  >
                    {['있음', '없음'].map((o, k) => (
                      <option key={k} value={o}>
                        {o}
                      </option>
                    ))}
                  </MypageFieldItemSelect>
                </Illusion>
              </MypageFieldItem>
            </MypageFieldBox>
          </MypageCategory>

          <MypageCategory>
            <MypageTitle>League of Legends</MypageTitle>

            <MypageFieldBox className="main-info">
              <Illusion>
                <MypageFieldInput
                  type="text"
                  value={newMe.nickname}
                  name="nickname"
                  onChange={changeNewMe}
                />
              </Illusion>
            </MypageFieldBox>

            <MypageFieldBox className="info">
              {newMe.lolLevel ? (
                <>
                  <MypageFieldItem>
                    <MypageFieldItemLabel>레벨</MypageFieldItemLabel>
                    <Illusion>
                      <MypageFieldItemText>
                        {Number(newMe.lolLevel)}
                      </MypageFieldItemText>
                    </Illusion>
                  </MypageFieldItem>
                  <MypageFieldItem>
                    <MypageFieldItemLabel>티어</MypageFieldItemLabel>
                    <Illusion>
                      <MypageFieldItemText>
                        {newMe.lolTear || 'Unranked'}
                      </MypageFieldItemText>
                    </Illusion>
                  </MypageFieldItem>
                  <MypageFieldItem>
                    <MypageFieldItemLabel>주 라인</MypageFieldItemLabel>
                    <Illusion>
                      <MypageFieldItemText>
                        {newMe.lolLane || 'ALL'}
                      </MypageFieldItemText>
                    </Illusion>
                  </MypageFieldItem>
                  <MypageFieldItem>
                    <MypageFieldItemLabel>주 챔피언</MypageFieldItemLabel>
                    <Illusion>
                      <MypageFieldItemText>
                        {newMe.lolChampion || 'ALL'}
                      </MypageFieldItemText>
                    </Illusion>
                  </MypageFieldItem>
                </>
              ) : (
                <MypageFieldItemUndefined>
                  해당 닉네임은 존재하지 않습니다.
                </MypageFieldItemUndefined>
              )}
            </MypageFieldBox>
          </MypageCategory>
        </>
      ) : (
        <h1 style={{ fontSize: '80px' }}>로딩중...</h1>
      )}
    </MypageBox>
  );
}

interface phyBoxMypageProps extends MeshProps {
  mypageClicked: boolean;
  maxSize: number;
  center: number[];
  type: 'cancel' | 'save';
  onReset: (callback: () => void) => Promise<void>;
}

export function PhyBoxMypage({
  mypageClicked,
  maxSize,
  center,
  type,
  onReset,
  ...props
}: phyBoxMypageProps) {
  const [hover, setHover] = useState(false);
  const [size, setSize] = useState(randomSizeGenerator());
  const [color, setColor] = useState(randomColorGenerator());

  const htmlRef = useRef({} as HTMLDivElement);
  const ref = useRef({} as THREE.Mesh);

  const timeoutHandle = useRef<NodeJS.Timeout>();

  const reset = async () => {
    setSize(0);

    await onReset(() => {
      setSize(randomSizeGenerator());
      setColor(randomColorGenerator());
      timeoutHandle.current = undefined;
      window.dispatchEvent(new Event('resize'));
    });
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
        else if (size > 0) setSize(size + 0.1);
      }}
    >
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
      <HTML style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div
          style={{
            position: 'relative',
            left: '-50%',
            top: '-15px',

            fontSize: '30px',
            fontWeight: 'bold',
            textShadow: '0px 0px 20px #FFF',

            transition: 'all 0.5s',

            opacity: mypageClicked ? 1 : 0,
          }}
        >
          {type === 'cancel' ? 'cancel' : 'save'}
        </div>
      </HTML>

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
