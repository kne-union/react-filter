import classnames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { Col, Row, Space } from 'antd';
import { useIntl } from '@kne/react-intl';
import { useContext } from './context';
import get from 'lodash/get';

const Line = ({ list, children }) => {
  const { value, onChange } = useContext();
  return (
    <div className={style['filter-line']}>
      {list
        .filter(item => !!item.type)
        .map((item, index) => {
          if (typeof item === 'function') {
            return item(props => {
              return {
                index,
                value: value ? get(value.get(props?.name), 'value') : props?.value,
                onChange: onChange
                  ? value =>
                      onChange({
                        name: props?.name,
                        label: props?.label,
                        value
                      })
                  : props?.onChange
              };
            });
          }
          const ComponentItem = item.type;
          return (
            <ComponentItem
              {...Object.assign({}, item.props, {
                value: value ? get(value.get(item.props.name), 'value') : item.props.value,
                onChange: onChange
                  ? value =>
                      onChange({
                        name: item.props.name,
                        label: item.props.label,
                        value
                      })
                  : item.props.onChange
              })}
              key={item.key || item.props.name || index}
            />
          );
        })}
      {children}
    </div>
  );
};

const FilterLines = ({ className, list = [], displayLine = 1, label, extra, children }) => {
  const hasMore = list.length > displayLine;
  const mobileList = list.reduce((result, item) => result.concat(Array.isArray(item) ? item : [item]), []);
  const [isExpand, setIsExpand] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollPrev, setShowScrollPrev] = useState(false);
  const [showScrollNext, setShowScrollNext] = useState(false);
  const scrollRef = useRef(null);
  const { formatMessage } = useIntl({ moduleName: 'Filter' });
  const updateScrollShadowVisible = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      return;
    }
    setShowScrollPrev(el.scrollLeft > 1);
    setShowScrollNext(el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
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
    if (!isMobile) {
      setShowScrollPrev(false);
      setShowScrollNext(false);
      return;
    }
    const el = scrollRef.current;
    if (!el) return;
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
  }, [isMobile, list, updateScrollShadowVisible]);

  const scrollToNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      left: el.scrollLeft + el.clientWidth * 0.8,
      behavior: 'smooth'
    });
  }, []);
  const scrollItemIntoView = useCallback(
    e => {
      if (!isMobile) return;
      const container = scrollRef.current;
      const item = e.target.closest(`.${style['filter-item-wrap']}`) || e.target.closest(`.${style['filter-item']}`);
      if (!container || !item) return;
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    },
    [isMobile]
  );

  return (
    <>
      <Space className={classnames(style['filter-title'], 'filter-title', className)} align="top" size={16}>
        <span className={style['filter-label']}>{list && list.length > 0 && (label || formatMessage({ id: 'filterText' }))}</span>
        <Row justify="space-between" wrap={false} align="top">
          <Col className={style['filter-list']} flex={1}>
            <div className={style['filter-list-scroll-wrap']}>
              {isMobile && showScrollPrev ? <div className={style['filter-scroll-prev-shadow']} /> : null}
              <div className={style['filter-list-scroll']} ref={scrollRef} onClick={scrollItemIntoView}>
                {(isMobile ? mobileList : list.slice(0, displayLine)).map((item, index) => (
                  <Line key={index} list={isMobile ? [item] : item}>
                    {!isMobile && hasMore && isExpand === false && index === displayLine - 1 ? (
                      <Space
                        size={4}
                        className={classnames(style['filter-item'], style['option'])}
                        onClick={() => {
                          setIsExpand(value => !value);
                        }}
                      >
                        {formatMessage({ id: 'moreText' })}
                        <span className={style['filter-item-option-icon']}>▼</span>
                      </Space>
                    ) : null}
                  </Line>
                ))}
              </div>
              {isMobile && showScrollNext ? (
                <button type="button" className={style['filter-scroll-next']} onClick={scrollToNext} aria-label="scroll next">
                  <span className={style['filter-scroll-next-icon']}>›</span>
                </button>
              ) : null}
            </div>
          </Col>
          <Col>{extra}</Col>
        </Row>
      </Space>
      <Space className={classnames(style['filter-title'], 'filter-title-wrap')} align="center" size={16}>
        {children}
      </Space>
      <Space
        className={classnames(style['filter-title'], 'filter-title-wrap', {
          [style['filter-title-hidden']]: isMobile || !(hasMore && isExpand)
        })}
        align="top"
        size={16}
      >
        <span className={style['filter-label']}>{formatMessage({ id: 'moreText' })}</span>
        <div className={style['filter-list']}>
          {list.slice(displayLine).map((item, index) => (
            <Line key={index} list={item}>
              {index === list.length - displayLine - 1 && (
                <>
                  <Space size={4} className={classnames(style['un-expand-shadow'])}>
                    <Space size={4} className={classnames(style['option'], style['filter-item'])}>
                      {formatMessage({ id: 'toggleUpText' })}
                      <span className={style['filter-item-option-icon']}>▲</span>
                    </Space>
                  </Space>
                  <Space
                    size={4}
                    className={classnames(style['un-expand'])}
                    onClick={() => {
                      setIsExpand(value => !value);
                    }}
                  >
                    <Space size={4} className={classnames(style['option'], style['filter-item'])}>
                      {formatMessage({ id: 'toggleUpText' })}
                      <span className={style['filter-item-option-icon']}>▲</span>
                    </Space>
                  </Space>
                </>
              )}
            </Line>
          ))}
        </div>
      </Space>
    </>
  );
};

export default FilterLines;
