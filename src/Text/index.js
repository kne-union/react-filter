import React from "react";
import {Input, InputNumber} from "antd";
import {withFilterItem} from "../FilterItem";
import SearchButton from "../SearchButton";

const withValue = (WrappedComponent, options = {}) => ({
                                                           name,
                                                           label,
                                                           isMore,
                                                           template,
                                                           defaultActive,
                                                           onBlur,
                                                           onSearch,
                                                           onBeforeSearch,
                                                           onActiveChange,
                                                           placeholder,
                                                           ...props
                                                       }) => {
    return <SearchButton defaultActive={defaultActive} isMore={isMore} onBlur={onBlur} template={template} name={name}
                         onSearch={onSearch}
                         onBeforeSearch={onBeforeSearch}
                         onActiveChange={(active) => {
                             onActiveChange && onActiveChange(active);
                         }}>
        {({value, setValue, setActive}) => <>
            <WrappedComponent size="small" {...props} placeholder={placeholder || label} value={value}
                              onChange={(e) => {
                                  setValue(options.getValue ? options.getValue(e) : e.target.value.trim());
                              }} onFocus={() => {
                setActive(true);
            }}/>
        </>}
    </SearchButton>;
};

export const TextInner = withValue(Input);
const Text = withFilterItem(withValue(Input));
Text.Number = withFilterItem(withValue(InputNumber, {
    getValue: (value) => {
        return value;
    }
}));

export default Text;

