import { Provider } from './context';
import clone from 'lodash/clone';
import { useMemo } from 'react';

const isNotEmpty = value => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

const FilterProvider = ({ children, value: valueBase, onChange, defaultValue = [] }) => {
  const value = useMemo(() => {
    return (valueBase || defaultValue).filter(item => isNotEmpty(item.value));
  }, [valueBase, defaultValue]);

  const filterValue = useMemo(() => {
    return new Map(value.map(item => [item.name, item]));
  }, [value]);

  return (
    <Provider
      value={{
        value: filterValue,
        onChange: item => {
          const newFilterValue = clone(filterValue);
          item.value ? newFilterValue.set(item.name, item) : newFilterValue.delete(item.name);
          onChange?.(Array.from(newFilterValue.values()));
        }
      }}
    >
      {typeof children === 'function' ? children({ value, onChange }) : children}
    </Provider>
  );
};

export default FilterProvider;
