import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import {
  getRooms,
  getRoomByJwtAndIdx,
  getRoomByJwtAndIdxRes,
  addMessageInRoom,
  message,
} from '../../../container/room';
import { getByIdx, getByIdxRes } from '../../../container/users';

import {
  RoomBox,
  RoomBoxUl,
  RoomBoxFavorites,
  RoomBoxDivider,
  RoomBoxLately,
  RoomBoxItem,
  RoomPageBackBtn,
  RoomPageBox,
  RoomPageUserInfo,
  RoomPageUserInfoEmail,
  RoomPageUserInfoNickname,
  RoomPageChatting,
  RoomPageMessageBox,
  RoomPageMessageContents,
  RoomPageInputBox,
  RoomPageInput,
  RoomPageInputBtn,
} from './style';

import Skeleton from '../../../utils/Skeleton';

export function useRoom(socket: SocketIOClient.Socket | undefined) {
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
      else if (focusRoom !== from)
        setRooms(
          rooms.map((r) => (r.userIdx === from ? { ...r, alarm: true } : r)),
        );
    };

    socket?.on('message', onMessageOfRoom);
    return () => {
      socket?.off('message', onMessageOfRoom);
    };
  }, [socket, rooms, focusRoom]);

  function setOnMessageOfRoomPage(initOfRoomPage: () => void) {
    const onMessageOfRoomPage = (from: string) => {
      if (from === focusRoom) initOfRoomPage();
    };

    return [
      () => {
        socket?.on('message', onMessageOfRoomPage);
      },
      () => {
        socket?.off('message', onMessageOfRoomPage);
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

    socket?.emit('message', to);

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
  const [emailArray, setEmailArray] = useState<
    {
      _id: string;
      email: string;
    }[]
  >();

  const init = useMemo(
    () => async () => {
      const set = new Set([...favorites, ...rooms.map((r) => r.userIdx)]);
      const uniqueArr = Array.from(set);

      const getByIdxResArray = await Promise.all(
        uniqueArr.map((idx) => getByIdx(idx)),
      );

      const res = getByIdxResArray.map((r) =>
        r?.result === 1 ? { _id: r.idx, email: r.id } : { _id: '', email: '' },
      );

      setEmailArray(res);
    },
    [favorites, rooms],
  );

  useEffect(() => {
    init();
  }, [init]);

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
            <RoomBoxItem
              key={k}
              onClick={itemClick}
              data-idx={f}
              data-email={
                emailArray ? emailArray.find((e) => e._id === f)?.email : ''
              }
            />
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
              data-email={
                emailArray
                  ? emailArray.find((e) => e._id === r.userIdx)?.email
                  : ''
              }
            />
          ))}
        </RoomBoxLately>
        <RoomBoxItem onClick={itemClick} data-email="추가하기">
          +
        </RoomBoxItem>
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
  setOnMessageOfRoomPage: (initOfRoomPage: () => void) => Function[];
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
  const [contents, setContents] = useState('');
  const [room, setRoom] = useState<getRoomByJwtAndIdxRes>();
  const [user, setUser] = useState<getByIdxRes>();
  const ref = useRef({} as HTMLDivElement);

  const init = useCallback(async () => {
    if (!focusRoom) return;

    const roomRes = await getRoomByJwtAndIdx(focusRoom);
    if (roomRes?.result === 1) setRoom(roomRes);

    const userRes = await getByIdx(focusRoom);
    if (userRes?.result === 1) setUser(userRes);
  }, [focusRoom]);
  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const [onMessageOfRoomPage, cleanUp] = setOnMessageOfRoomPage(async () => {
      const res = await getRoomByJwtAndIdx(focusRoom);
      if (res && res.result === 1) {
        setRoom(res);
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    });
    onMessageOfRoomPage();

    return () => {
      cleanUp();
    };
  }, [focusRoom, init, setOnMessageOfRoomPage]);

  const onClickSendMessageBtn = async () => {
    if (!room || !meIdx || !focusRoom) return;
    setContents('');

    setRoom({
      ...room,
      messages: await sendMessage(meIdx, focusRoom, contents),
    });
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  return (
    <RoomPageBox className={roomClicked ? 'on' : ''}>
      {room && user ? (
        <>
          <RoomPageBackBtn
            onClick={() => {
              onBlurRoom();
            }}
          >
            돌아가기
          </RoomPageBackBtn>
          <RoomPageUserInfo>
            <RoomPageUserInfoNickname
              target="_blank"
              href={`https://www.op.gg/summoner/userName=${user.nickname}`}
            >
              {user.nickname}
            </RoomPageUserInfoNickname>
            <RoomPageUserInfoEmail>{user.id}</RoomPageUserInfoEmail>
          </RoomPageUserInfo>

          <RoomPageChatting ref={ref}>
            {room.messages.map((m, k) => (
              <RoomPageMessageBox
                className={m.writer === meIdx ? 'right' : 'left'}
                key={k}
              >
                <RoomPageMessageContents>{m.contents}</RoomPageMessageContents>
              </RoomPageMessageBox>
            ))}
          </RoomPageChatting>

          <RoomPageInputBox>
            <RoomPageInput
              autoComplete="off"
              name="contents"
              value={contents}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') onClickSendMessageBtn();
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContents(e.target.value);
              }}
            />
            <RoomPageInputBtn
              className={contents ? '' : 'off'}
              onClick={onClickSendMessageBtn}
            >
              보내기
            </RoomPageInputBtn>
          </RoomPageInputBox>
        </>
      ) : (
        <>
          <RoomPageBackBtn
            onClick={() => {
              onBlurRoom();
            }}
          >
            돌아가기
          </RoomPageBackBtn>
          <RoomPageUserInfo>
            <Skeleton width="375px" height="40px" />
            <Skeleton width="150px" height="20px" />
          </RoomPageUserInfo>

          <RoomPageChatting>
            <RoomPageMessageBox className="right">
              <Skeleton width="250px" height="35px" />
            </RoomPageMessageBox>
            <RoomPageMessageBox className="right">
              <Skeleton width="250px" height="35px" />
            </RoomPageMessageBox>
            <RoomPageMessageBox className="left">
              <Skeleton width="250px" height="35px" />
            </RoomPageMessageBox>
            <RoomPageMessageBox className="left">
              <Skeleton width="250px" height="35px" />
            </RoomPageMessageBox>
            <RoomPageMessageBox className="right">
              <Skeleton width="250px" height="35px" />
            </RoomPageMessageBox>
          </RoomPageChatting>

          <RoomPageInputBox>
            <Skeleton width="100%" height="45px" />
          </RoomPageInputBox>
        </>
      )}
    </RoomPageBox>
  );
}
