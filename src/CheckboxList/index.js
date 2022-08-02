import React from "react";
import {Checkbox} from "antd";
import {withFilterItem} from "../FilterItem";
import {useConsumer} from "../context";

const CheckboxList = withFilterItem(({label, name, options, isMore, ...props}) => {
    const {value: aValue, onChange} = useConsumer();
    const currentValue = aValue[name];
    return <Checkbox.Group {...props} value={(currentValue || []).map(({value}) => value)} onChange={(value) => {
        const item = value.map((value) => {
            return options.find((item) => item.value === value);
        });
        console.log(item);
        onChange(name, item);
    }} options={options}/>
});

export default CheckboxList;
