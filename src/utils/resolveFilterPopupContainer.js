/**
 * Filter Item 弹窗挂载（不使用 RESPONSIVE_BOUNDARY_CLASS，避免劫持全局 pop）：
 * - useBoundaryMount（example container / 手机预览）：ResponsiveProvider 的 boundary
 * - 真实移动端 viewport：document.body
 * - 桌面端：页面级 boundary（usePopupContainer）
 */
export const resolveFilterPopupContainer = ({ isMobile, useBoundaryMount, getBoundaryElement }) => {
  if (!isMobile || useBoundaryMount) {
    return typeof getBoundaryElement === 'function' ? getBoundaryElement() : null;
  }
  return typeof document !== 'undefined' ? document.body : null;
};

export default resolveFilterPopupContainer;
