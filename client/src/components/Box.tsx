import styled from 'styled-components';

type boxProps = {
  width?: string;
  height?: string;
  weight?: string;
  color?: string;
};

const Box = styled.div<boxProps>`
  // box-sizing: contets;

  ${(props) => `
    width: ${props.width || '10vw'};
    height: ${props.height || '10vw'};

    border: ${props.weight || '1px'} ${props.color || 'black'} solid;
  `}
`;

export default Box;
