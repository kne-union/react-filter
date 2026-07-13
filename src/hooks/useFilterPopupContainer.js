import { useCallback } from 'react';
import { usePopupContainer } from '@kne/responsive-utils';
import useMobileFixedMode from './useMobileFixedMode';
import { resolveFilterPopupContainer } from '../utils/resolveFilterPopupContainer';

const useFilterPopupContainer = () => {
  const getBoundaryElement = usePopupContainer();
  const { isMobile, useBoundaryMount } = useMobileFixedMode();

  const getMountNode = useCallback(
    () =>
      resolveFilterPopupContainer({
        isMobile,
        useBoundaryMount,
        getBoundaryElement
      }),
    [getBoundaryElement, isMobile, useBoundaryMount]
  );

  const getPopupContainer = useCallback(() => getMountNode(), [getMountNode]);

  return {
    isMobile,
    useBoundaryMount,
    getMountNode,
    getPopupContainer
  };
};

export default useFilterPopupContainer;
