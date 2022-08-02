import React from "react";
import {Select} from "antd";
import {withFilterItem} from "../FilterItem";
import {useConsumer} from "../context";

export const SelectorInner = ({name, label, placeholder, isMore, ...props}) => {
    const {value: aValue, onChange} = useConsumer();
    const currentValue = aValue[name];
    return <Select {...props} placeholder={label || placeholder} size="small" value={currentValue}
                   onChange={(value, item) => {
                       onChange(name, item);
                   }}/>;
};

const Selector = withFilterItem(SelectorInner);

export default Selector;
