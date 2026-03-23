import { useState } from 'react';
import FilterItem from './FilterItem';
import style from './style.module.scss';

const isNotEmpty = value => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  return !(Array.isArray(value) && value.length === 0);
};

const withFieldItem =
  WrappedComponent =>
  ({ value, onChange, interceptor, label, render, ...props }) => {
    const [open, setOpen] = useState(false);
    const renderChildren = otherProps => (
      <WrappedComponent
        allowClear={false}
        {...Object.assign({}, props, otherProps)}
        className={style['filter-item-inner']}
        value={typeof interceptor?.input === 'function' ? interceptor.input(value) : value}
        onChange={typeof interceptor?.output === 'function' ? (...args) => onChange(interceptor.output(...args)) : onChange}
        valueType="all"
        onOpenChange={setOpen}
      />
    );
    return (
      <FilterItem label={label} open={open} active={isNotEmpty(value)}>
        {typeof render === 'function'
          ? render({
              children: renderChildren
            })
          : renderChildren()}
      </FilterItem>
    );
  };

export default withFieldItem;
