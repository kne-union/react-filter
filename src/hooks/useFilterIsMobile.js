import { createContext, useContext } from 'react';
import { IS_MOBILE_QUERY, MOBILE_BREAKPOINT, useMediaQuery, useResponsiveContext } from '@kne/responsive-utils';

/** FilterOuter 注入的移动端判定，保证 FilterLines / ValueDisplay 与根节点一致 */
export const FilterMobileOverrideContext = createContext(undefined);

/**
 * 仅按 ResponsiveContext / 视口判定（不含 FilterOuter override）。
 */
export const useDetectFilterIsMobile = () => {
  const { mode, containerWidth } = useResponsiveContext();
  const viewportIsMobile = useMediaQuery(IS_MOBILE_QUERY);

  if (mode === 'container' && typeof containerWidth === 'number') {
    return containerWidth < MOBILE_BREAKPOINT;
  }

  return viewportIsMobile;
};

/**
 * Filter 移动端判定：优先 FilterOuter 注入值；否则 container 模式用容器宽，默认视口。
 * 避免 Filter 嵌入窄列时仅因自身宽度误用移动端布局；TablePage 等可显式传入 isMobile。
 */
const useFilterIsMobile = () => {
  const override = useContext(FilterMobileOverrideContext);
  const detected = useDetectFilterIsMobile();

  if (typeof override === 'boolean') {
    return override;
  }

  return detected;
};

export default useFilterIsMobile;
