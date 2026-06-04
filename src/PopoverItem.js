import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button, Col, Dropdown, Row } from 'antd';
import FilterItem from './FilterItem';
import classnames from 'classnames';
import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import style from './style.module.scss';

const isNotEmpty = value => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

const MASK_ANIMATION_DURATION = 180;
const MOBILE_POPUP_OFFSET = 4;

const PopoverItem = withLocale(({ value, label, onValidate, overlayClassName, placement = 'bottomLeft', onOpenChange, onChange, children }) => {
  const [state, setState] = useState(value);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [renderMask, setRenderMask] = useState(false);
  const [maskClosing, setMaskClosing] = useState(false);
  const [popupMetrics, setPopupMetrics] = useState({ top: 0, pageTop: 0, height: 0 });
  const triggerRef = useRef(null);
  const disabled = useMemo(() => {
    return onValidate && !onValidate(state);
  }, [onValidate, state]);

  const { formatMessage } = useIntl({ moduleName: 'Filter' });

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

  const updatePopupMetrics = useCallback(() => {
    if (typeof window === 'undefined' || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const top = Math.max(rect.bottom + MOBILE_POPUP_OFFSET, 0);
    setPopupMetrics({
      top,
      height: Math.max(window.innerHeight - top, 0)
    });
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

  const closeDropdown = useCallback(() => {
    setOpen(false);
    onOpenChange && onOpenChange(false);
  }, [onOpenChange]);

  const handleOpenChange = useCallback(
    open => {
      if (open && isMobile) {
        updatePopupMetrics();
      }
      setOpen(open);
      setState(value);
      onOpenChange && onOpenChange(open);
    },
    [isMobile, onOpenChange, updatePopupMetrics, value]
  );

  const mobileOverlayStyle = isMobile
    ? {
        '--react-filter-popover-mobile-height': `${popupMetrics.height}px`,
        top: popupMetrics.top,
        left: 0
      }
    : undefined;

  const overlayContent = (
    <div
      className={style['pop-util-body']}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <div className={style['pop-util-content']}>{children({ value: state, onChange: setState })}</div>
      <Row className={style['pop-util-footer']} justify="end" gutter={8}>
        <Col>
          <Button size={isMobile ? undefined : 'small'} onClick={closeDropdown}>
            {formatMessage({ id: 'cancelText' })}
          </Button>
        </Col>
        <Col>
          <Button
            size={isMobile ? undefined : 'small'}
            type="primary"
            disabled={disabled}
            onClick={() => {
              closeDropdown();
              onChange && onChange(state);
            }}
          >
            {formatMessage({ id: 'determineText' })}
          </Button>
        </Col>
      </Row>
    </div>
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
            onClick={closeDropdown}
            onTouchMove={e => {
              e.preventDefault();
            }}
          />,
          document.body
        )}
      <Dropdown
        open={open}
        trigger={['click']}
        placement={isMobile ? 'bottomLeft' : placement}
        autoAdjustOverflow={!isMobile}
        align={isMobile ? { offset: [0, 0] } : undefined}
        overlayClassName={classnames(style['pop-util-overlay'], overlayClassName)}
        overlayStyle={mobileOverlayStyle}
        onOpenChange={handleOpenChange}
        menu={{ items: [{ key: 'content', label: null }] }}
        dropdownRender={() => overlayContent}
      >
        <span ref={triggerRef}>
          <FilterItem open={open} active={isNotEmpty(value)} label={label} />
        </span>
      </Dropdown>
    </>
  );
});

export default PopoverItem;
