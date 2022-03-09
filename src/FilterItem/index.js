import React from "react";
import { Space } from "antd";

const FilterItem = ({ label, children }) => {
  return <Space>
    <div className="react-filter-item-label">{label}:</div>
    <div className="react-filter-item-children">{children}</div>
  </Space>;
};

export const withFilterItem = (WrappedComponent) => ({ label, ...props }) => <FilterItem
  label={label}><WrappedComponent {...props} /></FilterItem>;

export default FilterItem;