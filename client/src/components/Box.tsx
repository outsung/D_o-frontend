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
    width: ${props.width || '50%'};
    height: ${props.height || '50%'};

    border: ${props.weight || '1px'} ${props.color || 'black'} solid;
  `}
`;

export default Box;
