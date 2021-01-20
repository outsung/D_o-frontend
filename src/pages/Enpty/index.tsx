import React from 'react';

import { EnptyPage, ErrorCodeText, HmmText } from './style';

const Empty = () => (
  <EnptyPage>
    <ErrorCodeText>v.0</ErrorCodeText>
    <ErrorCodeText>404</ErrorCodeText>
    <HmmText>Hmm..</HmmText>
  </EnptyPage>
);

export default Empty;
