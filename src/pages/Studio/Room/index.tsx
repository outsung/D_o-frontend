import React, { useState, useEffect, useCallback } from 'react';

import {
  getRooms,
  getRoomByJwtAndIdx,
  getRoomByJwtAndIdxRes,
  addMessageInRoom,
  message,
} from '../../../container/room';

import {
  RoomBox,
  RoomBoxUl,
  RoomBoxFavorites,
  RoomBoxDivider,
  RoomBoxLately,
  RoomBoxItem,
  RoomPageBox,
  RoomPageBoxMessageBox,
  RoomPageBoxMessageBoxContents,
  RoomPageBoxBackBtn,
} from './style';

export function useRoom(socket: SocketIOClient.Socket) {
  const [rooms, setRooms] = useState<{ userIdx: string; alarm: boolean }[]>([]);
  const [focusRoom, setFocusRoom] = useState('');
  const roomClicked = Boolean(focusRoom);

  const init = async () => {
    const res = await getRooms();
    if (res && res.result === 1) {
      setRooms(
        res.rooms.map((userIdx) => ({
          userIdx,
          alarm: res.uncheckedRoom.includes(userIdx),
        })),
      );
    }
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const onMessageOfRoom = (from: string) => {
      if (!rooms.find((r) => r.userIdx === from))
        setRooms([...rooms, { userIdx: from, alarm: true }]);
      else {
        setRooms(
          rooms.map((r) => (r.userIdx === from ? { ...r, alarm: true } : r)),
        );
      }
    };
    socket.on('message', onMessageOfRoom);
    return () => {
      socket.off('message', onMessageOfRoom);
    };
  }, [socket, rooms]);

  function setOnMessageOfRoomPage(
    _id: string | undefined,
    initOfRoomPage: () => void,
  ) {
    const onMessageOfRoomPage = (from: string) => {
      if (from !== _id) return;
      initOfRoomPage();
    };

    return [
      () => {
        socket.on('message', onMessageOfRoomPage);
      },
      () => {
        socket.off('message', onMessageOfRoomPage);
      },
    ];
  }

  const onFocusRoom = (_id: string) => {
    setFocusRoom(_id);

    setRooms(
      rooms.map((r) => (r.userIdx === _id ? { ...r, alarm: false } : r)),
    );
  };
  const onBlurRoom = () => {
    setFocusRoom('');
  };

  const sendMessage = async (from: string, to: string, contents: string) => {
    // console.log(`${from}가 ${to}에게 '${contents}'라고 합니다.`);
    const res = await addMessageInRoom(to, { contents });
    // console.log('res!!', res);
    if (!res || res.result !== 1) return [];

    socket.emit('message', to);

    return res.messages;
  };

  return {
    rooms,
    roomClicked,
    focusRoom,
    onFocusRoom,
    onBlurRoom,
    sendMessage,
    setOnMessageOfRoomPage,
  };
}

type roomProps = {
  isMain: boolean;
  favorites: string[];
  rooms: { userIdx: string; alarm: boolean }[];
  onFocusRoom: (_id: string) => void;
  // itemClick: () => void;
};
export function Room({ isMain, favorites, rooms, onFocusRoom }: roomProps) {
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
            <RoomBoxItem key={k} onClick={itemClick} data-idx={f} />
          ))}
        </RoomBoxFavorites>
        <RoomBoxDivider className={isFavorites ? '' : 'off'} />
        <RoomBoxLately>
          {rooms.map((r, k) => (
            <RoomBoxItem
              key={k}
              onClick={itemClick}
              className={r.alarm ? 'on' : ''}
              data-idx={r.userIdx}
            />
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
  sendMessage: (
    from: string,
    to: string,
    contents: string,
  ) => Promise<message[]>;
  setOnMessageOfRoomPage: (
    _id: string | undefined,
    initOfRoomPage: () => void,
  ) => Function[];
  meIdx: string | undefined;
};
export function RoomPage({
  roomClicked,
  focusRoom,
  onBlurRoom,
  sendMessage,
  setOnMessageOfRoomPage,
  meIdx,
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

  useEffect(() => {
    const [onMessageOfRoomPage, cleanUp] = setOnMessageOfRoomPage(meIdx, init);
    onMessageOfRoomPage();

    return () => {
      cleanUp();
    };
  }, [meIdx, init, setOnMessageOfRoomPage]);

  // 상대의 idx로 닉네임을 가져와야하나?

  const otherUserIdx = room?.users.find((u) => u !== meIdx);

  return (
    <RoomPageBox className={roomClicked ? 'on' : ''}>
      {room ? (
        <>
          <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
            참여한 유저 _id : {otherUserIdx}
          </div>
          <div
            style={{
              width: '750px',
              height: '500px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              overflowY: 'scroll',
            }}
          >
            {room.messages.map((m, k) => (
              <RoomPageBoxMessageBox
                className={m.writer === meIdx ? 'right' : 'left'}
                key={k}
              >
                <RoomPageBoxMessageBoxContents>
                  {m.contents}
                </RoomPageBoxMessageBoxContents>
              </RoomPageBoxMessageBox>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <RoomPageBoxBackBtn
              onClick={() => {
                onBlurRoom();
              }}
            >
              돌아가기
            </RoomPageBoxBackBtn>
            <RoomPageBoxBackBtn
              onClick={async () => {
                if (!meIdx || !otherUserIdx) return;
                const contents = '빼에에에에에에ㅔ에엒!!!!!!!!!!!!';
                setRoom({
                  ...room,
                  messages: await sendMessage(meIdx, otherUserIdx, contents),
                });
              }}
            >
              보내기!!!
            </RoomPageBoxBackBtn>
          </div>
        </>
      ) : (
        <div>...</div>
      )}
    </RoomPageBox>
  );
}
