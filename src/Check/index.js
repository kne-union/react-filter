import React from "react";
import {Checkbox} from "antd";
import {useConsumer} from "../context";
import classnames from "classnames";

const Check = ({name, label, className, isMore, ...props}) => {
    const {value: aValue, onChange} = useConsumer();
    const currentValue = aValue[name];
    return <Checkbox {...props} className={classnames('react-filter-item', className)} size="small"
                     checked={currentValue} onChange={(e) => {
        onChange(name, e.target.checked ? {value: true, label} : null);
    }}>{label}</Checkbox>;
};

export default Check;
