import React, {useState, useEffect, useRef} from "react";
import {Button, Space} from "antd";
import {useConsumer} from "../context";
import useSimulationBlur from "@kne/use-simulation-blur";
import classnames from "classnames";
import {get, isFunction} from "lodash";

const SearchButton = ({
                          name,
                          isMore,
                          template,
                          children,
                          defaultValue,
                          defaultActive,
                          onBlur,
                          onSearch,
                          onBeforeSearch,
                          onActiveChange,
                          buttonText
                      }) => {
    const {value: aValue, onChange} = useConsumer();
    const currentValue = aValue[name];
    const initCurrentValue = get(currentValue, "value");
    const [value, setValue] = useState(defaultValue || initCurrentValue);

    const [active, setActive] = useState(defaultActive);
    const withTemplate = (value = '') => ({
        value, label: isFunction(template) ? template(value) : value.toString()
    });

    useEffect(() => {
        setValue(initCurrentValue);
    }, [initCurrentValue]);

    const ref = useSimulationBlur(() => {
        setValue(initCurrentValue);
        setActive(false);
        onBlur && onBlur();
    });

    const activeChangeRef = useRef(onActiveChange);
    activeChangeRef.current = onActiveChange;

    useEffect(() => {
        activeChangeRef.current && activeChangeRef.current(active);
    }, [active]);
    return <div className={classnames("react-filter-search-button", {
        "is-active": active && !isMore
    })} ref={ref} onMouseEnter={() => {
        !active && setActive(true);
    }} onMouseLeave={() => {
        active && initCurrentValue === value && setActive(false);
    }}>
        <Space className="inner" size={0}>
            <div>{children({value, setValue, setActive})}</div>
            {active || isMore ?
                <Button className={classnames("react-filter-search-confirm", {
                    "is-more": isMore
                })} size="small" type="primary" onClick={(e) => {
                    e.stopPropagation();
                    if (onBeforeSearch && onBeforeSearch(value) === false) {
                        return;
                    }
                    onChange(name, withTemplate(value));
                    setActive(false);
                    onSearch && onSearch({value});
                }}>{buttonText}</Button> : null}</Space>
    </div>;
};

SearchButton.defaultProps = {
    defaultActive: false, buttonText: "确定"
};

export default SearchButton;
