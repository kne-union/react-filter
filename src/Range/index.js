import React, { useState } from "react";
import { InputNumber, Space, Tooltip } from "antd";
import { withFilterItem } from "../FilterItem";
import SearchButton from "../SearchButton";
import get from "lodash/get";
import isNumber from "lodash/isNumber";

export const RangeInner = ({
                             name, size, defaultActive, template, onBlur, onSearch, onActiveChange, startProps, endProps
                           }) => {
  const [error, setError] = useState(null);
  const check = (value) => {
    setError(null);
    if (!Array.isArray(value)) {
      return false;
    }
    if (value[0] === null && value[1] === null) {
      setError("最大值和最小值不能同时为空");
      return false;
    }
    if (isNumber(value[1]) && value[0] > value[1]) {
      setError("最大值不能小于最小值");
      return false;
    }
    return true;
  };
  return <SearchButton size={size} template={template} onBlur={onBlur} defaultActive={defaultActive} name={name} onSearch={onSearch}
                       onBeforeSearch={(value) => {
                         return check(value);
                       }} onActiveChange={(active) => {
    if (!active) {
      setError(null);
    }
    onActiveChange && onActiveChange(active);
  }}>
    {({ value, setValue, setActive }) => <Tooltip visible={!!error} title={error} placement="bottomRight"><Space
      size="small">
      <InputNumber size="small" {...startProps} value={get(value, 0)} onChange={(inputValue) => {
        const target = [inputValue, get(value, 1)];
        check(target);
        setValue(target);
      }} onFocus={() => {
        setActive(true);
      }} />
      ~
      <InputNumber size="small" {...endProps} value={get(value, 1)} onChange={(inputValue) => {
        const target = [get(value, 0), inputValue];
        check(target);
        setValue(target);
      }} onFocus={() => {
        setActive(true);
      }} />
    </Space></Tooltip>}
  </SearchButton>;
};

const Range = withFilterItem(RangeInner);

export default Range;

