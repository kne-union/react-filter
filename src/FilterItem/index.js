import React from "react";
import {Space} from "antd";
import classnames from 'classnames';

const FilterItem = ({className, label, children}) => {
    return <Space className={classnames('react-filter-item', className)}>
        <div className="react-filter-item-label">{label}:</div>
        <div className="react-filter-item-children">{children}</div>
    </Space>;
};

export const withFilterItem = (WrappedComponent) => ({label, ...props}) => <FilterItem
    label={label}><WrappedComponent {...props} /></FilterItem>;

export default FilterItem;
