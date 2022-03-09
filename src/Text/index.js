import React from "react";
import { Input } from "antd";
import { withFilterItem } from "../FilterItem";
import SearchButton from "../SearchButton";

export const TextInner = ({ name, label, template, defaultActive, onBlur, onSearch, onActiveChange, ...props }) => {
  return <SearchButton defaultActive={defaultActive} onBlur={onBlur} template={template} name={name} onSearch={onSearch}
                       onActiveChange={(active) => {
                         onActiveChange && onActiveChange(active);
                       }}>
    {({ value, setValue, setActive }) => <>
      <Input size="small" {...props} value={value} onChange={(e) => {
        setValue(e.target.value);
      }} onFocus={() => {
        setActive(true);
      }} />
    </>}
  </SearchButton>;
};

const Text = withFilterItem(TextInner);

export default Text;

