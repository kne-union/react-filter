import { Input } from 'antd';
import withFilterValue from './withFilterValue';
import { useIntl } from '@kne/react-intl';

const { Search } = Input;

const SearchInput = withFilterValue(({ label, onChange, value, placeholder, ...props }) => {
  const { formatMessage } = useIntl({ moduleName: 'Filter' });
  return (
    <Search
      {...props}
      placeholder={placeholder || formatMessage({ id: 'inputPlaceholder' }, { label })}
      value={value?.value || ''}
      onSearch={value => {
        onChange({ label: value, value });
      }}
    />
  );
});

export default SearchInput;
