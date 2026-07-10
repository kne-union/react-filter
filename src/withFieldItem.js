import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePopupContainer, useScrollElement } from '@kne/responsive-utils';
import useMobileFixedMode from './hooks/useMobileFixedMode';
import FilterItem from './FilterItem';
import style from './style.module.scss';
import classnames from 'classnames';
import useResponsiveScrollListener from './hooks/useResponsiveScrollListener';
import { getMobilePopupMetrics } from './utils/getMobilePopupMetrics';
import { MOBILE_MASK_Z_INDEX, MOBILE_POPUP_Z_INDEX } from './constants/mobilePopup';

const isNotEmpty = value => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return !(Array.isArray(value) && value.length === 0);
};

const MASK_ANIMATION_DURATION = 180;
const FIELD_MOBILE_POPUP_CLASS = 'react-filter-field-mobile-popup';
const MOBILE_POPUP_OFFSET = 4;

const withFieldItem =
  (WrappedComponent, options = {}) =>
  ({ value, onChange, interceptor, label, render, ...props }) => {
    const [open, setOpen] = useState(false);
    const { isMobile, useBoundaryMount } = useMobileFixedMode();
    const fixedModeClass = useBoundaryMount ? style['is-boundary'] : style['is-viewport'];
    const [renderMask, setRenderMask] = useState(false);
    const [maskClosing, setMaskClosing] = useState(false);
    const [popupMetrics, setPopupMetrics] = useState({ top: 0, pageTop: 0, height: 0 });
    const triggerRef = useRef(null);
    const getBoundaryElement = usePopupContainer();
    const getScrollElement = useScrollElement();
    const resolveGetPopupContainer = useCallback(
      triggerNode => {
        if (typeof props.getPopupContainer === 'function') {
          const customContainer = props.getPopupContainer(triggerNode);
          if (customContainer) {
            return customContainer;
          }
        }
        if (!isMobile) {
          return getBoundaryElement();
        }
        if (useBoundaryMount) {
          return getBoundaryElement();
        }
        return typeof document !== 'undefined' ? document.body : null;
      },
      [getBoundaryElement, isMobile, props.getPopupContainer, useBoundaryMount]
    );
    const popupMountNode = typeof document !== 'undefined' ? (isMobile ? (useBoundaryMount ? getBoundaryElement() || document.body : document.body) : getBoundaryElement() || document.body) : null;
    const setMobilePopupVariables = useCallback(metrics => {
      if (typeof document === 'undefined') return;
      document.body.style.setProperty('--react-filter-field-mobile-height', `${metrics.height}px`);
      document.body.style.setProperty('--react-filter-popover-mobile-height', `${metrics.height}px`);
      document.body.style.setProperty('--react-filter-field-mobile-top', `${metrics.top}px`);
    }, []);
    const updatePopupMetrics = useCallback(() => {
      if (typeof window === 'undefined' || !triggerRef.current) return;
      const metrics = getMobilePopupMetrics(triggerRef.current, {
        scrollEl: getScrollElement(),
        boundaryEl: getBoundaryElement(),
        useBoundaryMount,
        offset: MOBILE_POPUP_OFFSET
      });
      setPopupMetrics(metrics);
      setMobilePopupVariables(metrics);
    }, [getBoundaryElement, getScrollElement, setMobilePopupVariables, useBoundaryMount]);

    useResponsiveScrollListener(updatePopupMetrics, open && isMobile);

    useEffect(() => {
      if (typeof document === 'undefined' || !isMobile || popupMetrics.height <= 0) return;
      setMobilePopupVariables(popupMetrics);
      return () => {
        document.body.style.removeProperty('--react-filter-field-mobile-height');
        document.body.style.removeProperty('--react-filter-popover-mobile-height');
        document.body.style.removeProperty('--react-filter-field-mobile-top');
      };
    }, [isMobile, popupMetrics, setMobilePopupVariables]);

    useEffect(() => {
      if (open && isMobile) {
        setRenderMask(true);
        setMaskClosing(false);
        return;
      }

      if (!renderMask) return;
      setMaskClosing(true);
      const timer = setTimeout(() => {
        setRenderMask(false);
        setMaskClosing(false);
      }, MASK_ANIMATION_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }, [isMobile, open, renderMask]);

    const closeFieldItem = useCallback(() => {
      setOpen(false);
      props.onOpenChange && props.onOpenChange(false);
      props.onDropdownVisibleChange && props.onDropdownVisibleChange(false);
    }, [props]);

    const handleOpenChange = useCallback(
      open => {
        if (open && isMobile) {
          updatePopupMetrics();
        }
        setOpen(open);
        props.onOpenChange && props.onOpenChange(open);
        props.onDropdownVisibleChange && props.onDropdownVisibleChange(open);
      },
      [isMobile, props, updatePopupMetrics]
    );

    const mobilePopupStyle = isMobile
      ? {
          '--react-filter-field-mobile-height': `${popupMetrics.height}px`,
          '--react-filter-popover-mobile-height': `${popupMetrics.height}px`,
          '--react-filter-field-mobile-top': `${popupMetrics.top}px`,
          top: popupMetrics.top,
          left: popupMetrics.left ?? 0,
          zIndex: MOBILE_POPUP_Z_INDEX
        }
      : undefined;

    const mergePopupClassNames = classNames => {
      if (!isMobile) return classNames;
      return Object.assign({}, classNames, {
        popup: Object.assign({}, classNames?.popup, {
          root: classnames(classNames?.popup?.root, style['field-item-mobile-popup'], FIELD_MOBILE_POPUP_CLASS, fixedModeClass)
        })
      });
    };

    const mergePopupStyles = styles => {
      if (!isMobile) return styles;
      return Object.assign({}, styles, {
        popup: Object.assign({}, styles?.popup, {
          root: Object.assign({}, styles?.popup?.root, mobilePopupStyle)
        })
      });
    };

    const renderChildren = otherProps => {
      const inputValue = typeof interceptor?.input === 'function' ? interceptor.input(value) : value;
      const fieldValue = options.forcePopup && inputValue == null ? (props.single ? null : []) : inputValue;
      return (
        <WrappedComponent
          allowClear={false}
          {...Object.assign({}, props, otherProps)}
          className={style['filter-item-inner']}
          value={fieldValue}
          onChange={typeof interceptor?.output === 'function' ? (...args) => onChange(interceptor.output(...args)) : onChange}
          valueType="all"
          onOpenChange={handleOpenChange}
          onDropdownVisibleChange={handleOpenChange}
          getPopupContainer={resolveGetPopupContainer}
          popupClassName={classnames(props.popupClassName, isMobile && style['field-item-mobile-popup'], isMobile && FIELD_MOBILE_POPUP_CLASS, isMobile && fixedModeClass)}
          dropdownClassName={classnames(props.dropdownClassName, isMobile && style['field-item-mobile-popup'], isMobile && FIELD_MOBILE_POPUP_CLASS, isMobile && fixedModeClass)}
          overlayClassName={classnames(props.overlayClassName, isMobile && style['field-item-mobile-popup'], isMobile && FIELD_MOBILE_POPUP_CLASS, isMobile && fixedModeClass)}
          overlayStyle={Object.assign({}, props.overlayStyle, mobilePopupStyle)}
          popupStyle={Object.assign({}, props.popupStyle, mobilePopupStyle)}
          dropdownStyle={Object.assign({}, props.dropdownStyle, mobilePopupStyle)}
          classNames={mergePopupClassNames(props.classNames)}
          styles={mergePopupStyles(props.styles)}
          transitionName={isMobile ? '' : props.transitionName}
          autoAdjustOverflow={isMobile ? false : props.autoAdjustOverflow}
          align={isMobile ? { offset: [0, 0] } : props.align}
          isPopup={options.forcePopup ? true : props.isPopup}
          zIndex={isMobile ? MOBILE_POPUP_Z_INDEX : props.zIndex}
          overlayWidth={
            isMobile && options.forcePopup
              ? typeof window === 'undefined'
                ? props.overlayWidth
                : getMobilePopupMetrics(triggerRef.current, {
                    scrollEl: getScrollElement(),
                    boundaryEl: getBoundaryElement(),
                    useBoundaryMount
                  }).width || window.innerWidth
              : props.overlayWidth
          }
        />
      );
    };
    return (
      <>
        {renderMask &&
          popupMountNode &&
          createPortal(
            <div
              className={classnames(style['pop-util-mask'], maskClosing && style['pop-util-mask-leave'], fixedModeClass)}
              style={{
                top: popupMetrics.top,
                height: popupMetrics.height,
                zIndex: MOBILE_MASK_Z_INDEX
              }}
              onClick={closeFieldItem}
              onTouchMove={e => {
                e.preventDefault();
              }}
            />,
            popupMountNode
          )}
        <span ref={triggerRef}>
          <FilterItem label={label} open={open} active={isNotEmpty(value)}>
            {typeof render === 'function'
              ? render({
                  children: renderChildren
                })
              : renderChildren()}
          </FilterItem>
        </span>
      </>
    );
  };

export default withFieldItem;
