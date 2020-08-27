import { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT } from '../../defines';

export default function useMobileOrientation() {
  const [windowInfo, setWindowInfo] = useState<{
    isMobile: boolean;
    isPortrait: boolean;
    innerWidth: number;
    innerHeight: number;
    ratio: number;
  }>({
    isMobile: true,
    isPortrait: true,
    innerWidth: 0,
    innerHeight: 0,
    ratio: 1,
  });

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth < window.innerHeight) {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
          setWindowInfo({
            isMobile: true,
            isPortrait: true,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            ratio: window.innerHeight / window.innerWidth,
          });
        } else {
          setWindowInfo({
            isMobile: false,
            isPortrait: true,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            ratio: window.innerHeight / window.innerWidth,
          });
        }
      } else if (window.innerHeight < MOBILE_BREAKPOINT) {
        setWindowInfo({
          isMobile: true,
          isPortrait: false,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          ratio: window.innerHeight / window.innerWidth,
        });
      } else {
        setWindowInfo({
          isMobile: false,
          isPortrait: false,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          ratio: window.innerHeight / window.innerWidth,
        });
      }
    };
    window.addEventListener('resize', handler, {
      capture: false,
      passive: true,
    });
    handler();
    return () => window.removeEventListener('resize', handler);
  }, []);
  return windowInfo;
}