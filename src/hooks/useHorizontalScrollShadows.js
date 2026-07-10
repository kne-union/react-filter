import { useCallback, useEffect, useRef, useState } from 'react';
import useResponsiveScrollListener from './useResponsiveScrollListener';

const useHorizontalScrollShadows = ({ enabled, suspend = false, preserveOverflowOnSuspend = false, refreshKey } = {}) => {
  const scrollRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showScrollPrev, setShowScrollPrev] = useState(false);
  const [showScrollNext, setShowScrollNext] = useState(false);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !enabled) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      setIsOverflow(false);
      return;
    }

    if (suspend) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      if (!preserveOverflowOnSuspend) {
        setIsOverflow(false);
      }
      return;
    }

    setIsOverflow(el.scrollWidth > el.clientWidth);
    setShowScrollPrev(el.scrollLeft > 1);
    setShowScrollNext(el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, [enabled, preserveOverflowOnSuspend, suspend]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !enabled || suspend) {
      update();
      return;
    }

    update();
    el.addEventListener('scroll', update);
    const rafId = window.requestAnimationFrame(update);
    return () => {
      el.removeEventListener('scroll', update);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, refreshKey, suspend, update]);

  useResponsiveScrollListener(update, enabled && !suspend);

  return { scrollRef, isOverflow, showScrollPrev, showScrollNext, updateScrollShadowVisible: update };
};

export default useHorizontalScrollShadows;
