import styled, { keyframes } from 'styled-components';

const skeletonAnimaion = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`;

const Skeleton = styled.div<{ width?: string; height?: string }>`
  border-radius: 13px;

  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.height && `height: ${props.height};`}

  background-color: rgba(0, 0, 0, 0.3);

  animation: ${skeletonAnimaion} 2s 1s infinite linear alternate;
`;

export default Skeleton;
