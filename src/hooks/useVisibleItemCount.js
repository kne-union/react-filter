import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const GAP = 8;
const SAFETY_GAP = 2;

const useVisibleItemCount = ({ items, enabled, strategy = 'asc' }) => {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const moreMeasureRef = useRef(null);
  const rafRef = useRef(null);
  const lastWidthRef = useRef(0);
  const [containerEl, setContainerEl] = useState(null);
  const [visibleCount, setVisibleCount] = useState(() => (items.length > 0 ? 1 : 0));

  const setContainerRef = useCallback(node => {
    containerRef.current = node;
    setContainerEl(node || null);
  }, []);

  const setMeasureRef = useCallback(node => {
    measureRef.current = node;
  }, []);

  const setMoreMeasureRef = useCallback(node => {
    moreMeasureRef.current = node;
  }, []);

  const getWidths = useCallback(() => {
    const container = containerRef.current;
    const measureEl = measureRef.current;
    if (!container || !measureEl) {
      return null;
    }

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) {
      return null;
    }

    const itemNodes = measureEl.querySelectorAll('[data-filter-measure-item]');
    if (!itemNodes.length) {
      return null;
    }

    const moreButtonWidth = moreMeasureRef.current?.getBoundingClientRect().width || 0;
    if (items.length > 1 && moreButtonWidth <= 0) {
      return null;
    }

    const itemWidths = Array.from(itemNodes, node => node.getBoundingClientRect().width);
    return { containerWidth, itemWidths, moreButtonWidth };
  }, [items.length]);

  const getWidthForCount = useCallback(
    (itemWidths, moreButtonWidth, count) => {
      let usedWidth = 0;
      for (let i = 0; i < count; i++) {
        usedWidth += itemWidths[i] + (i > 0 ? GAP : 0);
      }

      if (count < items.length) {
        usedWidth += GAP + moreButtonWidth;
      }

      return usedWidth;
    },
    [items.length]
  );

  const resolveVisibleCount = useCallback(
    widths => {
      const { containerWidth, itemWidths, moreButtonWidth } = widths;
      const maxCount = Math.min(items.length, itemWidths.length);
      let count = 1;

      if (strategy === 'desc') {
        count = maxCount;
        while (count > 1) {
          const usedWidth = getWidthForCount(itemWidths, moreButtonWidth, count);
          if (usedWidth + SAFETY_GAP <= containerWidth) {
            break;
          }
          count -= 1;
        }
      } else {
        count = 1;
        while (count < maxCount) {
          const nextCount = count + 1;
          const usedWidth = getWidthForCount(itemWidths, moreButtonWidth, nextCount);
          if (usedWidth + SAFETY_GAP > containerWidth) {
            break;
          }
          count = nextCount;
        }
      }

      return Math.max(1, count);
    },
    [getWidthForCount, items.length, strategy]
  );

  const calculateByWidth = useCallback(() => {
    if (!enabled || !items.length) {
      setVisibleCount(prev => (prev === items.length ? prev : items.length));
      return;
    }

    const widths = getWidths();
    if (!widths) {
      return;
    }

    const nextCount = resolveVisibleCount(widths);
    setVisibleCount(prev => (prev === nextCount ? prev : nextCount));
  }, [enabled, getWidths, items.length, resolveVisibleCount]);

  const scheduleCalculate = useCallback(() => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      calculateByWidth();
    });
  }, [calculateByWidth]);

  useLayoutEffect(() => {
    scheduleCalculate();
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [items, scheduleCalculate]);

  useEffect(() => {
    if (!enabled || !containerEl) {
      return undefined;
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries.find(item => item.target === containerEl);
      const nextWidth = entry?.contentRect.width ?? containerEl.clientWidth;

      if (Math.abs(nextWidth - lastWidthRef.current) < 1) {
        return;
      }

      lastWidthRef.current = nextWidth;
      scheduleCalculate();
    });

    lastWidthRef.current = containerEl.clientWidth;
    observer.observe(containerEl);
    window.addEventListener('resize', scheduleCalculate);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', scheduleCalculate);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [containerEl, enabled, scheduleCalculate]);

  return { setContainerRef, setMeasureRef, setMoreMeasureRef, visibleCount };
};

export default useVisibleItemCount;
