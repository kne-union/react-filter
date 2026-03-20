import { useIntl } from '@kne/react-intl';
import withFieldItem from '../withFieldItem';
import InputFilterItemField from './InputFilterItem';
import NumberRangeFilterItemField from './NumberRangeFilterItem';
import withLocale from '../withLocale';

const withInputDefaultPlaceholder = WrappedComponent =>
  withLocale(({ placeholder, label, ...props }) => {
    const { formatMessage } = useIntl({ moduleName: 'Filter' });
    return <WrappedComponent {...props} label={label} placeholder={placeholder || formatMessage({ id: 'defaultInputPlaceholder' }, { label })} />;
  });

export const InputFilterItem = withInputDefaultPlaceholder(InputFilterItemField);
export const NumberRangeFilterItem = withInputDefaultPlaceholder(NumberRangeFilterItemField);

export { default as DatePickerFilterItem } from './DatePickerFilterItem';
export { default as DateRangePickerFilterItem } from './DateRangePickerFilterItem';
export { default as TypeDateRangePickerFilterItem } from './TypeDateRangePickerFilterItem';
