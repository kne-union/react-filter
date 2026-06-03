import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import FilterItem from './FilterItem';
import style from './style.module.scss';
import classnames from 'classnames';

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
    const [isMobile, setIsMobile] = useState(false);
    const [renderMask, setRenderMask] = useState(false);
    const [maskClosing, setMaskClosing] = useState(false);
    const [popupMetrics, setPopupMetrics] = useState({ top: 0, pageTop: 0, height: 0 });
    const triggerRef = useRef(null);
    const updatePopupMetrics = useCallback(() => {
      if (typeof window === 'undefined' || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const top = Math.max(rect.bottom + MOBILE_POPUP_OFFSET, 0);
      setPopupMetrics({
        top,
        pageTop: top + window.scrollY,
        height: Math.max(window.innerHeight - top, 0)
      });
    }, []);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      const updateIsMobile = () => {
        setIsMobile(mediaQuery.matches);
      };
      updateIsMobile();
      mediaQuery.addEventListener ? mediaQuery.addEventListener('change', updateIsMobile) : mediaQuery.addListener(updateIsMobile);
      return () => {
        mediaQuery.removeEventListener ? mediaQuery.removeEventListener('change', updateIsMobile) : mediaQuery.removeListener(updateIsMobile);
      };
    }, []);

    useEffect(() => {
      if (!open || !isMobile) return;
      updatePopupMetrics();
      window.addEventListener('resize', updatePopupMetrics);
      window.addEventListener('scroll', updatePopupMetrics, true);
      return () => {
        window.removeEventListener('resize', updatePopupMetrics);
        window.removeEventListener('scroll', updatePopupMetrics, true);
      };
    }, [isMobile, open, updatePopupMetrics]);

    useEffect(() => {
      if (typeof document === 'undefined' || !isMobile) return;
      document.body.style.setProperty('--react-filter-field-mobile-height', `${popupMetrics.height}px`);
      document.body.style.setProperty('--react-filter-popover-mobile-height', `${popupMetrics.height}px`);
      document.body.style.setProperty('--react-filter-field-mobile-top', `${popupMetrics.pageTop}px`);
      return () => {
        document.body.style.removeProperty('--react-filter-field-mobile-height');
        document.body.style.removeProperty('--react-filter-popover-mobile-height');
        document.body.style.removeProperty('--react-filter-field-mobile-top');
      };
    }, [isMobile, popupMetrics.height, popupMetrics.pageTop]);

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
          '--react-filter-field-mobile-top': `${popupMetrics.pageTop}px`
        }
      : undefined;

    const mergePopupClassNames = classNames => {
      if (!isMobile) return classNames;
      return Object.assign({}, classNames, {
        popup: Object.assign({}, classNames?.popup, {
          root: classnames(classNames?.popup?.root, style['field-item-mobile-popup'], FIELD_MOBILE_POPUP_CLASS)
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

    const renderChildren = otherProps => (
      <WrappedComponent
        allowClear={false}
        {...Object.assign({}, props, otherProps)}
        className={style['filter-item-inner']}
        value={typeof interceptor?.input === 'function' ? interceptor.input(value) : value}
        onChange={typeof interceptor?.output === 'function' ? (...args) => onChange(interceptor.output(...args)) : onChange}
        valueType="all"
        onOpenChange={handleOpenChange}
        onDropdownVisibleChange={handleOpenChange}
        popupClassName={classnames(props.popupClassName, isMobile && style['field-item-mobile-popup'], isMobile && FIELD_MOBILE_POPUP_CLASS)}
        dropdownClassName={classnames(props.dropdownClassName, isMobile && style['field-item-mobile-popup'], isMobile && FIELD_MOBILE_POPUP_CLASS)}
        overlayClassName={classnames(props.overlayClassName, isMobile && style['field-item-mobile-popup'], isMobile && FIELD_MOBILE_POPUP_CLASS)}
        popupStyle={Object.assign({}, props.popupStyle, mobilePopupStyle)}
        dropdownStyle={Object.assign({}, props.dropdownStyle, mobilePopupStyle)}
        classNames={mergePopupClassNames(props.classNames)}
        styles={mergePopupStyles(props.styles)}
        transitionName={isMobile ? '' : props.transitionName}
        isPopup={options.forcePopup ? true : props.isPopup}
        overlayWidth={isMobile && options.forcePopup ? (typeof window === 'undefined' ? props.overlayWidth : window.innerWidth) : props.overlayWidth}
      />
    );
    return (
      <>
        {renderMask &&
          typeof document !== 'undefined' &&
          createPortal(
            <div
              className={classnames(style['pop-util-mask'], maskClosing && style['pop-util-mask-leave'])}
              style={{
                top: popupMetrics.top,
                height: popupMetrics.height
              }}
              onClick={closeFieldItem}
            />,
            document.body
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
