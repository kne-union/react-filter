import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };
    updateIsMobile();
    mediaQuery.addEventListener ? mediaQuery.addEventListener('change', updateIsMobile) : mediaQuery.addListener(updateIsMobile);
    return () => {
      mediaQuery.removeEventListener ? mediaQuery.removeEventListener('change', updateIsMobile) : mediaQuery.removeListener(updateIsMobile);
    };
  }, []);

  return isMobile;
};

export default useMobile;
