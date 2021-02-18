import React, { useState, useEffect, useCallback } from 'react';

import {
  getRoom,
  getRoomByJwtAndIdx,
  getRoomByJwtAndIdxRes,
} from '../../../container/room';

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
  const [room, setRoom] = useState<string[]>([]);
  const [focusRoom, setFocusRoom] = useState('');
  const roomClicked = Boolean(focusRoom);

  const init = async () => {
    const res = await getRoom();
    setRoom(res && res.result === 1 && res.room ? res.room : []);
  };
  useEffect(() => {
    init();
  }, []);

  const onFocusRoom = (_id: string) => {
    setFocusRoom(_id);
  };
  const onBlurRoom = () => {
    setFocusRoom('');
  };

  return { room, roomClicked, focusRoom, onFocusRoom, onBlurRoom };
}

type roomProps = {
  isMain: boolean;
  favorites: string[];
  room: string[];
  onFocusRoom: (_id: string) => void;
  // itemClick: () => void;
};
export function Room({ isMain, favorites, room, onFocusRoom }: roomProps) {
  const isFavorites = Boolean(favorites.length);

  const itemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const _id = e.currentTarget.dataset.idx;
    if (_id) onFocusRoom(_id);
  };

  return (
    <RoomBox className={isMain ? '' : 'right'}>
      <RoomBoxUl>
        <RoomBoxFavorites className={isFavorites ? '' : 'off'}>
          {favorites.map((f, k) => (
            <RoomBoxItem key={k} onClick={itemClick} url={TEST} data-idx={f} />
          ))}
        </RoomBoxFavorites>
        <RoomBoxDivider className={isFavorites ? '' : 'off'} />
        <RoomBoxLately>
          {room.map((r, k) => (
            <RoomBoxItem key={k} onClick={itemClick} data-idx={r} />
          ))}
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
  const [room, setRoom] = useState<getRoomByJwtAndIdxRes>();

  const init = useCallback(async () => {
    if (!focusRoom) return;
    setRoom(undefined);

    const res = await getRoomByJwtAndIdx(focusRoom);
    if (res && res.result === 1) setRoom(res);
  }, [focusRoom]);
  useEffect(() => {
    init();
  }, [init]);

  return (
    <RoomPageBox className={roomClicked ? 'on' : ''}>
      {room ? (
        <>
          <h1>{room._id}</h1>
          <h1>{room.users}</h1>
          <div>
            {room.messages.map((m, k) => (
              <div key={k}>
                <h3>{m._id}</h3>
                <h3>{m.contents}</h3>
                <h3>{m.date}</h3>
                <h3>{m.read}</h3>
                <h3>{m.writer}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>...</div>
      )}
      <RoomPageBoxBackBtn
        onClick={() => {
          onBlurRoom();
        }}
      >
        돌아가기
      </RoomPageBoxBackBtn>
    </RoomPageBox>
  );
}
