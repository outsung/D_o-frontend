import React from 'react';
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
  isFavorites,
  addFavorites,
  removeFavorites,
}: userProfileProps) {
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
        isChcek={isFavorites}
        onClick={() => (isFavorites ? removeFavorites(_id) : addFavorites(_id))}
      >
        ★
      </Btn>
      <Btn
        style={{ top: '3px', right: '33px' }}
        onClick={() => alert('아직 구현되지 않았습니다.')}
        isChcek
      >
        ↻
      </Btn>
    </ProfileBox>
  );
}

export default UserProfile;
