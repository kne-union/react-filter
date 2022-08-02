import React from "react";
import {DatePicker} from "antd";
import {withFilterItem} from "../FilterItem";
import {useConsumer} from "../context";
import moment from 'moment';
import {isFunction} from 'lodash';

const withValue = (WrappedComponent, options = {}) => ({name, label, placeholder, template, isMore, ...props}) => {
    const {value: aValue, onChange} = useConsumer();
    const currentValue = aValue[name];
    return <WrappedComponent {...props}
                             placeholder={options.range ? placeholder || [label, label] : (placeholder || label)}
                             size="small" value={currentValue && moment(currentValue)}
                             onChange={(value, item) => {
                                 onChange(name, {
                                     label: isFunction(template) ? template(item) : options.range ? item.join('~') : item,
                                     value: item
                                 });
                             }}/>;
};

const DateTime = withFilterItem(withValue(DatePicker));

DateTime.Month = withFilterItem(withValue(DatePicker.MonthPicker));

DateTime.Week = withFilterItem(withValue(DatePicker.WeekPicker));

DateTime.Time = withFilterItem(withValue(DatePicker.TimePicker));

DateTime.YearPicker = withFilterItem(withValue(DatePicker.YearPicker));

DateTime.Range = withFilterItem(withValue(DatePicker.RangePicker, {range: true}));

export default DateTime;
