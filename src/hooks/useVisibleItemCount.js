import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useResponsiveScrollListener from './useResponsiveScrollListener';

const GAP = 8;
const SAFETY_GAP = 2;
/** 首次 ready 前：容器宽度需连续稳定该时长再裁切（先全量放出，稳定后一次性收起） */
const SETTLE_MS = 100;
/** 若布局持续抖动，最迟强制提交，避免一直停在测量态 */
const MAX_SETTLE_MS = 400;
/** 已 ready 后：忽略约一个滚动条宽度的变宽，打断「收起→滚动条消失→再撑开」反馈环 */
const EXPAND_HYSTERESIS_PX = 16;

const useVisibleItemCount = ({ items, enabled, strategy = 'asc' }) => {
  const safeItems = Array.isArray(items) ? items : [];
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const moreMeasureRef = useRef(null);
  const rafRef = useRef(null);
  const settleTimerRef = useRef(null);
  const lastWidthRef = useRef(0);
  const lastCommittedWidthRef = useRef(0);
  const lastSettleWidthRef = useRef(0);
  const stableSinceRef = useRef(0);
  const itemsKeyRef = useRef(null);
  const readyRef = useRef(!enabled || safeItems.length === 0);
  const visibleCountRef = useRef(safeItems.length);
  const settleStartedAtRef = useRef(0);
  const [containerEl, setContainerEl] = useState(null);
  // 先全量展示，测量稳定后再裁切，避免首帧「更多 → 再撑开」
  const [visibleCount, setVisibleCount] = useState(() => safeItems.length);
  const [ready, setReady] = useState(() => !enabled || safeItems.length === 0);

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

  const clearSettleTimer = useCallback(() => {
    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
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
    if (safeItems.length > 1 && moreButtonWidth <= 0) {
      return null;
    }

    const itemWidths = Array.from(itemNodes, node => node.getBoundingClientRect().width);
    // 任一 item 仍为 0 宽：说明子项（如 PopoverItem）尚未完成布局，继续等
    if (itemWidths.some(width => width <= 0)) {
      return null;
    }

    return { containerWidth, itemWidths, moreButtonWidth };
  }, [safeItems.length]);

  const getWidthForCount = useCallback(
    (itemWidths, moreButtonWidth, count) => {
      let usedWidth = 0;
      for (let i = 0; i < count; i++) {
        usedWidth += itemWidths[i] + (i > 0 ? GAP : 0);
      }

      if (count < safeItems.length) {
        usedWidth += GAP + moreButtonWidth;
      }

      return usedWidth;
    },
    [safeItems.length]
  );

  const resolveVisibleCount = useCallback(
    widths => {
      const { containerWidth, itemWidths, moreButtonWidth } = widths;
      const maxCount = Math.min(safeItems.length, itemWidths.length);
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
    [getWidthForCount, safeItems.length, strategy]
  );

  const commitCount = useCallback(
    (nextCount, containerWidth) => {
      clearSettleTimer();
      settleStartedAtRef.current = 0;
      stableSinceRef.current = 0;
      visibleCountRef.current = nextCount;
      readyRef.current = true;
      lastCommittedWidthRef.current = containerWidth;
      lastWidthRef.current = containerWidth;
      lastSettleWidthRef.current = containerWidth;
      setVisibleCount(prev => (prev === nextCount ? prev : nextCount));
      setReady(true);
    },
    [clearSettleTimer]
  );

  const calculateByWidth = useCallback(() => {
    if (!enabled || !safeItems.length) {
      visibleCountRef.current = safeItems.length;
      readyRef.current = true;
      setVisibleCount(prev => (prev === safeItems.length ? prev : safeItems.length));
      setReady(true);
      clearSettleTimer();
      return;
    }

    const widths = getWidths();
    if (!widths) {
      // 测不到（含 item 宽仍为 0）：继续等，不要提前 commit 成「更多」
      if (!readyRef.current) {
        if (!settleStartedAtRef.current) {
          settleStartedAtRef.current = Date.now();
        }
        if (Date.now() - settleStartedAtRef.current >= MAX_SETTLE_MS) {
          // 超时仍测不到：保持全量并结束测量态
          commitCount(safeItems.length, containerRef.current?.clientWidth || lastSettleWidthRef.current || 0);
          return;
        }
        clearSettleTimer();
        settleTimerRef.current = window.setTimeout(() => {
          settleTimerRef.current = null;
          calculateByWidth();
        }, SETTLE_MS);
      }
      return;
    }

    const nextCount = resolveVisibleCount(widths);
    const { containerWidth } = widths;

    // 未 ready：保持全量展示，等容器宽度真正稳定后再一次性裁切（只收起、不先收再撑）
    if (!readyRef.current) {
      if (!settleStartedAtRef.current) {
        settleStartedAtRef.current = Date.now();
      }

      if (Math.abs(containerWidth - lastSettleWidthRef.current) >= 1) {
        lastSettleWidthRef.current = containerWidth;
        stableSinceRef.current = Date.now();
        clearSettleTimer();
        settleTimerRef.current = window.setTimeout(() => {
          settleTimerRef.current = null;
          calculateByWidth();
        }, SETTLE_MS);
        return;
      }

      if (!stableSinceRef.current) {
        stableSinceRef.current = Date.now();
      }

      const stableFor = Date.now() - stableSinceRef.current;
      const waited = Date.now() - settleStartedAtRef.current;

      if (stableFor >= SETTLE_MS || waited >= MAX_SETTLE_MS) {
        commitCount(nextCount, containerWidth);
        return;
      }

      clearSettleTimer();
      settleTimerRef.current = window.setTimeout(
        () => {
          settleTimerRef.current = null;
          calculateByWidth();
        },
        Math.max(SETTLE_MS - stableFor, 16)
      );
      return;
    }

    if (nextCount === visibleCountRef.current) {
      lastWidthRef.current = containerWidth;
      return;
    }

    // 变宽导致「放出」更多项时，忽略约滚动条宽度的抖动
    if (nextCount > visibleCountRef.current && containerWidth - lastCommittedWidthRef.current < EXPAND_HYSTERESIS_PX) {
      return;
    }

    commitCount(nextCount, containerWidth);
  }, [enabled, getWidths, safeItems.length, resolveVisibleCount, commitCount, clearSettleTimer]);

  const scheduleCalculate = useCallback(() => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }

    // 双 rAF：等父级 flex（toolbar 右侧 buttonGroup 等）完成布局再测
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        calculateByWidth();
      });
    });
  }, [calculateByWidth]);

  useLayoutEffect(() => {
    // items 变化时先全量展示再测，避免沿用旧 visibleCount 闪一下
    const nextKey = safeItems;
    if (itemsKeyRef.current !== nextKey) {
      itemsKeyRef.current = nextKey;
      const nextReady = !enabled || safeItems.length === 0;
      visibleCountRef.current = safeItems.length;
      readyRef.current = nextReady;
      settleStartedAtRef.current = 0;
      stableSinceRef.current = 0;
      lastSettleWidthRef.current = 0;
      clearSettleTimer();
      setVisibleCount(safeItems.length);
      setReady(nextReady);
    }

    scheduleCalculate();
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      clearSettleTimer();
    };
  }, [safeItems, enabled, scheduleCalculate, clearSettleTimer]);

  useEffect(() => {
    if (!enabled || !containerEl) {
      return undefined;
    }

    const onWidthChange = nextWidth => {
      if (Math.abs(nextWidth - lastWidthRef.current) < 1) {
        return;
      }
      lastWidthRef.current = nextWidth;
      scheduleCalculate();
    };

    const observer = new ResizeObserver(entries => {
      const entry = entries.find(item => item.target === containerEl) || entries[0];
      const nextWidth = entry?.contentRect?.width ?? containerEl.clientWidth;
      onWidthChange(nextWidth);
    });

    lastWidthRef.current = containerEl.clientWidth;
    observer.observe(containerEl);
    // 父级宽度变化（toolbar 收窄）时也重测，避免过早 commit 后再撑开
    if (containerEl.parentElement) {
      observer.observe(containerEl.parentElement);
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      clearSettleTimer();
    };
  }, [containerEl, enabled, scheduleCalculate, clearSettleTimer]);

  useResponsiveScrollListener(scheduleCalculate, enabled && !!containerEl);

  return { setContainerRef, setMeasureRef, setMoreMeasureRef, visibleCount, ready };
};

export default useVisibleItemCount;
