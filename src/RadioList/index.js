import React from "react";
import {Radio} from "antd";
import {withFilterItem} from "../FilterItem";
import {useConsumer} from "../context";
import {get} from 'lodash'

const RadioList = withFilterItem(({label, name, options, isMore, ...props}) => {
    const {value: aValue, onChange} = useConsumer();
    const currentValue = aValue[name];
    return <Radio.Group {...props} options={options} value={get(currentValue, 'value')} onChange={(e) => {
        const item = options.find((item) => item.value === e.target.value);
        onChange(name, item);
    }}/>
});

export default RadioList;
