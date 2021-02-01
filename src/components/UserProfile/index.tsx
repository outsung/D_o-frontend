import React from 'react';
import history from '../../utils/browserHistory';

import {
  ProfileBox,
  ImageBox,
  Image,
  BoxDivider,
  FieldBox,
  Field,
  FieldA,
  FieldLink,
  Btn,
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
        <FieldLink onClick={() => history.push(`/users/${_id}`)}>
          {id}
        </FieldLink>
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
      <Btn onClick={() => alert('아직 구현되지 않았습니다.')}>★</Btn>
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
