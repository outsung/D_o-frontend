import React, { useRef, useEffect } from 'react';

import useWindowSize from './useWindowSize';

type illusionProps = {
  children: JSX.Element;
};
function Illusion({ children }: illusionProps) {
  const size = useWindowSize();

  const originalRef = useRef({} as HTMLDivElement);
  const illusionRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    const rect = originalRef.current.getBoundingClientRect();

    illusionRef.current.tabIndex = -1;

    illusionRef.current.style.margin = '0px';
    illusionRef.current.style.top = `${rect.top}px`;
    illusionRef.current.style.left = `${rect.left}px`;
    illusionRef.current.style.width = `${rect.width}px`;
    illusionRef.current.style.height = `${rect.height}px`;
    illusionRef.current.style.boxSizing = 'border-box';

    illusionRef.current.onclick = () => originalRef.current.click();
    illusionRef.current.onfocus = () => originalRef.current.focus();
  }, [size]);

  const originalElement = React.cloneElement(children, {
    ref: originalRef,
  });
  const illusionElement = React.cloneElement(children, {
    onClick: undefined,
    ref: illusionRef,
    style: {
      zIndex: 100,
      position: 'fixed',
      opacity: 0,
    },
  });

  return (
    <>
      {originalElement}
      {illusionElement}
    </>
  );
}

export default Illusion;
