import { useState, useMemo } from 'react';
import { Button, Col, Popover, Row } from 'antd';
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

const PopoverItem = withLocale(({ value, label, onValidate, overlayClassName, placement = 'bottomLeft', onOpenChange, onChange, children }) => {
  const [state, setState] = useState(value);
  const [open, setOpen] = useState(false);
  const disabled = useMemo(() => {
    return onValidate && !onValidate(state);
  }, [onValidate, state]);

  const { formatMessage } = useIntl({ moduleName: 'Filter' });

  return (
    <Popover
      open={open}
      trigger="click"
      placement={placement}
      arrow={false}
      rootClassName={classnames(style['pop-util-overlay'], overlayClassName)}
      onOpenChange={open => {
        setOpen(open);
        setState(value);
        onOpenChange && onOpenChange(open);
      }}
      content={
        <span
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className={style['pop-util-content']}>{children({ value: state, onChange: setState })}</div>
          <Row className={style['pop-util-footer']} justify="end" gutter={8}>
            <Col>
              <Button
                size="small"
                onClick={() => {
                  setOpen(false);
                  onOpenChange && onOpenChange(false);
                }}
              >
                {formatMessage({ id: 'cancelText' })}
              </Button>
            </Col>
            <Col>
              <Button
                size="small"
                type="primary"
                disabled={disabled}
                onClick={() => {
                  setOpen(false);
                  onOpenChange && onOpenChange(false);
                  onChange && onChange(state);
                }}
              >
                {formatMessage({ id: 'determineText' })}
              </Button>
            </Col>
          </Row>
        </span>
      }
    >
      <span>
        <FilterItem open={open} active={isNotEmpty(value)} label={label} />
      </span>
    </Popover>
  );
});

export default PopoverItem;
