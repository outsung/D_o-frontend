import React, { useState } from 'react';

import {
  RoomBox,
  RoomBoxUl,
  RoomBoxFavorites,
  RoomBoxDivider,
  RoomBoxLately,
  RoomBoxItem,
  RoomPageBox,
  RoomPageBoxBackBtn,
} from './style';

const TEST =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8d66f61f-4cde-446b-8046-170777277cd9/outsung.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210216T105108Z&X-Amz-Expires=86400&X-Amz-Signature=9abea07855cccd82aa1623cb1a22520d092eff97b4b09c52b27a4110ae74ada8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22outsung.png%22';

export function useRoom() {
  const [focusRoom, setFocusRoom] = useState('');
  const roomClicked = Boolean(focusRoom);

  const onFocusRoom = (_id: string) => {
    setFocusRoom(_id);
  };
  const onBlurRoom = () => {
    setFocusRoom('');
  };

  return { roomClicked, focusRoom, onFocusRoom, onBlurRoom };
}

type roomProps = {
  isMain: boolean;
  favorites: string[];
  onFocusRoom: (_id: string) => void;
  // itemClick: () => void;
};
export function Room({ isMain, favorites, onFocusRoom }: roomProps) {
  const isFavorites = Boolean(favorites.length);

  const itemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const _id = e.currentTarget.dataset.idx;
    if (_id) onFocusRoom(_id);
  };

  return (
    <RoomBox className={isMain ? '' : 'right'}>
      <RoomBoxUl>
        <RoomBoxFavorites className={isFavorites ? '' : 'off'}>
          {/* 즐겨찾기 */}
          {favorites.map((f, k) => (
            <RoomBoxItem key={k} onClick={itemClick} url={TEST} data-idx={f} />
          ))}
        </RoomBoxFavorites>
        <RoomBoxDivider className={isFavorites ? '' : 'off'} />
        <RoomBoxLately>
          <RoomBoxItem style={{ fontSize: '15px' }} onClick={itemClick}>
            test1
          </RoomBoxItem>
          <RoomBoxItem style={{ fontSize: '15px' }} onClick={itemClick}>
            test2
          </RoomBoxItem>
        </RoomBoxLately>
        <RoomBoxItem onClick={itemClick}>+</RoomBoxItem>
      </RoomBoxUl>
    </RoomBox>
  );
}
type roomPageProps = {
  roomClicked: boolean;
  focusRoom: string;
  onBlurRoom: () => void;
};
export function RoomPage({
  roomClicked,
  focusRoom,
  onBlurRoom,
}: roomPageProps) {
  return (
    <RoomPageBox className={roomClicked ? 'on' : ''}>
      <h1>제작중...</h1>
      <div>나와 {focusRoom}유저의 체팅 방</div>
      <RoomPageBoxBackBtn onClick={onBlurRoom}>돌아가기</RoomPageBoxBackBtn>
    </RoomPageBox>
  );
}
