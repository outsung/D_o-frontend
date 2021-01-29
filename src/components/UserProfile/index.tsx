import React from 'react';

import {
  ProfileBox,
  ImageBox,
  Image,
  BoxDivider,
  FieldBox,
  Field,
  FieldA,
  Star,
} from './style';

type userProfileProps = {
  _id: string;
  id: string;
  nickname: string;
};
function UserProfile({ _id, id, nickname }: userProfileProps) {
  return (
    <ProfileBox>
      <ImageBox>
        <Image />
      </ImageBox>
      <BoxDivider />
      <FieldBox>
        <FieldA target="_blank" href={`/users/${_id}`}>
          {id}
        </FieldA>
        {nickname ? (
          <FieldA
            target="_blank"
            href={`https://www.op.gg/summoner/userName=${nickname}`}
          >
            {nickname}
          </FieldA>
        ) : (
          <Field>...</Field>
        )}
        <Field>브론즈 | 원딜</Field>
        <Field>🎙️ : ??</Field>
        <Field>성별 : ??</Field>
      </FieldBox>
      <Star onClick={() => alert('아직 구현되지 않았습니다.')}>★</Star>
    </ProfileBox>
  );
}

export default UserProfile;
