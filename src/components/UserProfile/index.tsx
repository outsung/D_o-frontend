import React, { useEffect, useMemo, useState } from 'react';
import {
  ProfileBox,
  ImageBox,
  Image,
  BoxDivider,
  FieldBox,
  Field,
  Btn,
} from './style';

const GENDER_KR = { male: '남자', female: '여자', Private: '비공개' };

type userProfileProps = {
  _id: string;
  id: string;
  nickname: string;
  tear: string;
  lane: string;
  age: number;
  gender: 'male' | 'female' | 'Private';
  refreshTime: Date | undefined;
  clickUpdateBtn: (_id: string) => void;
  isFavorites: boolean;
  addFavorites: (idx: string) => void;
  removeFavorites: (idx: string) => void;
};
function UserProfile({
  _id,
  id,
  nickname,
  tear,
  lane,
  age,
  gender,
  refreshTime,
  clickUpdateBtn,
  isFavorites,
  addFavorites,
  removeFavorites,
}: userProfileProps) {
  const elapsedMSec = useMemo(() => {
    const date = new Date();
    if (!refreshTime) return 1000 * 150;
    const refreshDate = new Date(refreshTime);
    return date.getTime() - refreshDate.getTime();
  }, [refreshTime]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updateBtnCheck, setUpdateBtnCheck] = useState(false);

  useEffect(() => {
    setUpdateBtnCheck(false);
    setIsRefreshing(false);
  }, [refreshTime]);

  useEffect(() => {
    const elapsedSec = elapsedMSec / 1000;
    const is = elapsedSec > 120;

    const afterTime = 120 - elapsedSec;

    const timeoutHandle = setTimeout(
      () => {
        setUpdateBtnCheck(true);
      },
      is ? 1 : afterTime * 1000,
    );
    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [elapsedMSec]);

  return (
    <ProfileBox>
      <ImageBox>
        <Image />
      </ImageBox>
      <BoxDivider />
      <FieldBox>
        <Field>{id}</Field>
        <Field>{nickname}</Field>
        <Field>
          {tear || 'Unranked'} | {lane || 'ALL'}
        </Field>
        <Field>나이 : {age}</Field>
        <Field>성별 : {GENDER_KR[gender]}</Field>
      </FieldBox>
      <Btn
        isCheck={isFavorites}
        onClick={() => (isFavorites ? removeFavorites(_id) : addFavorites(_id))}
      >
        ★
      </Btn>
      <Btn
        className={isRefreshing ? 'refreshing' : ''}
        style={{ top: '3px', right: '33px' }}
        onClick={() => {
          if (updateBtnCheck && !isRefreshing) {
            setIsRefreshing(true);
            clickUpdateBtn(_id);
          }
        }}
        isCheck={updateBtnCheck}
      >
        ↻
      </Btn>
    </ProfileBox>
  );
}

export default UserProfile;
