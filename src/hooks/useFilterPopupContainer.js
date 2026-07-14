import { useCallback } from 'react';
import { MOBILE_POPUP_MODE, useMobilePopupMount } from '@kne/responsive-utils';

/**
 * Filter 弹层挂载：cover=viewport（半屏/下拉罩住当前移动可视区）
 */
const useFilterPopupContainer = (options = {}) => {
  const { getPopupContainer: getPopupContainerProp, ...rest } = options;
  const { isMobile, fixedModeClass, getMountNode, getPopupContainer, resolveMount, anchorRef } = useMobilePopupMount({
    cover: 'viewport',
    getPopupContainer: getPopupContainerProp,
    ...rest
  });

  const useBoundaryMount = !!(isMobile && fixedModeClass === MOBILE_POPUP_MODE.boundary);

  const getMountNodeSafe = useCallback(triggerNode => getMountNode(triggerNode) || (typeof document !== 'undefined' ? document.body : null), [getMountNode]);

  return {
    isMobile,
    useBoundaryMount,
    fixedModeClass,
    getMountNode: getMountNodeSafe,
    getPopupContainer,
    resolveMount,
    anchorRef
  };
};

export default useFilterPopupContainer;
