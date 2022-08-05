import React, {useState} from "react";
import {InputNumber, Space, Tooltip} from "antd";
import {withFilterItem} from "../FilterItem";
import SearchButton from "../SearchButton";
import {get, isNumber} from "lodash";

export const RangeInner = ({
                               name,
                               isMore,
                               defaultActive,
                               template,
                               onBlur,
                               onSearch,
                               onActiveChange,
                               onBeforeSearch,
                               startProps,
                               endProps,
                               placeholder
                           }) => {
    const [error, setError] = useState(null);
    const check = (value) => {
        setError(null);
        if (!Array.isArray(value)) {
            return false;
        }
        if (isNumber(value[1]) && value[0] > value[1]) {
            setError("最大值不能小于最小值");
            return false;
        }
        if (onBeforeSearch) {
            return onBeforeSearch(value);
        }
        return true;
    };
    return <SearchButton template={template} isMore={isMore} onBlur={onBlur} defaultActive={defaultActive}
                         name={name}
                         onSearch={onSearch}
                         onBeforeSearch={(value) => {
                             return check(value);
                         }} onActiveChange={(active) => {
        if (!active) {
            setError(null);
        }
        onActiveChange && onActiveChange(active);
    }}>
        {({value, setValue, setActive}) => <Tooltip visible={!!error} title={error} placement="bottomRight"><Space
            size="small" className="react-filter-range">
            <InputNumber size="small" {...startProps} value={get(value, 0)} onChange={(inputValue) => {
                const target = [inputValue, get(value, 1)];
                check(target);
                setValue(target);
            }} onFocus={() => {
                setActive(true);
            }} placeholder={Array.isArray(placeholder) ? placeholder[0] : (placeholder || "请输入")}/>
            ~
            <InputNumber size="small" {...endProps} value={get(value, 1)} onChange={(inputValue) => {
                const target = [get(value, 0), inputValue];
                check(target);
                setValue(target);
            }} onFocus={() => {
                setActive(true);
            }} placeholder={Array.isArray(placeholder) ? placeholder[0] : (placeholder || "请输入")}/>
        </Space></Tooltip>}
    </SearchButton>;
};

const Range = withFilterItem(RangeInner);

export default Range;

