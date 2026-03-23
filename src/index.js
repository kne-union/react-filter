import Filter from './Filter';
import * as fields from './fields';
import getFilterValue from './getFilterValue';
import { useContext as useFilter } from './context';
import withFilterValue from './withFilterValue';
import SearchInput from './SearchInput';
import FilterProvider from './FilterProvider';

Filter.fields = fields;
Filter.getFilterValue = getFilterValue;
Filter.useFilter = useFilter;
Filter.SearchInput = SearchInput;
Filter.withFilterValue = withFilterValue;
Filter.FilterProvider = FilterProvider;

export default Filter;
export { fields, getFilterValue, useFilter, withFilterValue, SearchInput, FilterProvider };
export { default as AdvancedFilter } from './AdvancedFilter';
export { default as FilterValueDisplay } from './FilterValueDisplay';
export { default as FilterItem } from './FilterItem';
export { default as FilterLines } from './FilterLines';
export { default as PopoverItem } from './PopoverItem';
export { default as withFieldItem } from './withFieldItem';
export { default as FilterItemContainer } from './FilterItemContainer';
export { default as TypeDateRangePickerField } from './common/TypeDateRangePickerField';
export {
  NumberRangeFilterItem,
  InputFilterItem,
  DatePickerFilterItem,
  DateRangePickerFilterItem,
  TypeDateRangePickerFilterItem,
  SuperSelectFilterItem,
  SelectFunctionFilterItem,
  SelectIndustryFilterItem,
  SelectAddressFilterItem
} from './fields';
