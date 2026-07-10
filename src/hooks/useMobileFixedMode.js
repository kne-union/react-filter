import { useResponsiveContext } from '@kne/responsive-utils';
import useFilterIsMobile from './useFilterIsMobile';

/**
 * 与 system-layout Toolbar 一致：
 * - container 模式（example 手机预览）：absolute + boundary 挂载
 * - viewport 模式（真实移动端）：fixed + 视口坐标
 */
const useMobileFixedMode = () => {
  const isMobile = useFilterIsMobile();
  const { mode } = useResponsiveContext();
  const useBoundaryMount = isMobile && mode === 'container';
  const useViewportFixed = isMobile && mode !== 'container';

  return { isMobile, useBoundaryMount, useViewportFixed };
};

export default useMobileFixedMode;
