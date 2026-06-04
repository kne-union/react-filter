import { Button, Space, Tag } from 'antd';
import style from './style.module.scss';
import classnames from 'classnames';
import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const FilterValueDisplay = withLocale(({ value: filterValue, extraExpand, onChange }) => {
  const { formatMessage } = useIntl({ moduleName: 'Filter' });
  const [isMobile, setIsMobile] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showScrollPrev, setShowScrollPrev] = useState(false);
  const [showScrollNext, setShowScrollNext] = useState(false);
  const scrollRef = useRef(null);
  const updateScrollShadowVisible = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !isMobile) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      setIsOverflow(false);
      return;
    }
    if (isExpand) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      return;
    }
    setIsOverflow(el.scrollWidth > el.clientWidth);
    setShowScrollPrev(el.scrollLeft > 1);
    setShowScrollNext(el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, [isExpand, isMobile]);

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
    const el = scrollRef.current;
    if (!el || !isMobile) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      setIsOverflow(false);
      return;
    }
    if (isExpand) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      return;
    }
    updateScrollShadowVisible();
    const update = () => {
      updateScrollShadowVisible();
    };
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    const rafId = window.requestAnimationFrame(update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.cancelAnimationFrame(rafId);
    };
  }, [filterValue, isExpand, isMobile, updateScrollShadowVisible]);

  const tags = filterValue.map(({ name, label, value }, index) => {
    const valueLabel = Array.isArray(value) ? value.map(item => item.label).join('，') : value?.label;
    return (
      <Tag
        key={name}
        closable
        className={style['filter-value-tag']}
        onClose={() => {
          const newValue = filterValue.slice(0);
          newValue.splice(index, 1);
          onChange(newValue);
        }}
      >
        <span className={style['filter-value-tag-label']}>{label}:</span>
        <span className={style['filter-value-tag-content']}>{valueLabel}</span>
      </Tag>
    );
  });

  return (
    <Space className={classnames(style['filter-title'], style['filter-value-display'])} align="top" size={16}>
      <span className={style['filter-label']}>{formatMessage({ id: 'selectedText' })}</span>
      <div className={classnames(style['filter-value-display-content'], !isOverflow && style['is-not-overflow'])}>
        <div className={classnames(style['filter-value-tags-wrap'], isExpand && style['is-expand'])}>
          {showScrollPrev ? <div className={classnames(style['filter-scroll-prev-shadow'], style['filter-value-scroll-prev-shadow'])} /> : null}
          <div ref={scrollRef} className={classnames(style['filter-line'], style['filter-value-tags'], isExpand && style['is-expand'])}>
            {tags}
          </div>
          {showScrollNext ? <div className={classnames(style['filter-value-scroll-next-shadow'])} /> : null}
        </div>
        <div className={classnames(style['filter-value-actions'], isOverflow && style['is-overflow'])}>
          <div className={style['filter-value-action-right']}>
            <Space size={4}>
              {extraExpand}
              <Button
                size="small"
                onClick={() => {
                  onChange([]);
                }}
              >
                {formatMessage({ id: 'clearAllText' })}
              </Button>
            </Space>
          </div>
          {isOverflow ? (
            <Button
              type="link"
              size="small"
              className={style['filter-value-toggle']}
              icon={isExpand ? <UpOutlined /> : <DownOutlined />}
              onClick={() => {
                setIsExpand(value => !value);
              }}
            >
              {isExpand ? '收起' : '展开'}
            </Button>
          ) : null}
          <div className={style['filter-value-action-placeholder']}>
            {extraExpand}
            <Button size="small">{formatMessage({ id: 'clearAllText' })}</Button>
          </div>
        </div>
      </div>
    </Space>
  );
});

export default FilterValueDisplay;
