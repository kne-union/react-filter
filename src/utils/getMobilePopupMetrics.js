export const getMobilePopupMetrics = (triggerEl, { scrollEl, boundaryEl, useBoundaryMount, offset = 4 } = {}) => {
  if (typeof window === 'undefined' || !triggerEl) {
    return { top: 0, left: 0, height: 0, width: 0 };
  }

  const rect = triggerEl.getBoundingClientRect();

  if (useBoundaryMount && boundaryEl) {
    const boundaryRect = boundaryEl.getBoundingClientRect();
    const top = Math.max(rect.bottom - boundaryRect.top + offset, 0);

    return {
      top,
      left: 0,
      height: Math.max(boundaryRect.height - top, 0),
      width: boundaryRect.width
    };
  }

  const scrollRect = scrollEl?.getBoundingClientRect?.();
  const visibleTop = scrollRect?.top ?? 0;
  const visibleBottom = scrollRect?.bottom ?? window.innerHeight;
  const width = scrollRect?.width ?? window.innerWidth;
  const top = Math.max(rect.bottom + offset, visibleTop);

  return {
    top,
    left: 0,
    height: Math.max(visibleBottom - top, 0),
    width
  };
};
