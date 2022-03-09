import React, { useState, useEffect, useRef } from "react";
import { Button, Space } from "antd";
import { useConsumer } from "../context";
import useClickOutSide from "@kne/use-click-outside";
import classnames from "classnames";
import isFunction from "lodash/isFunction";
import get from "lodash/get";

const SearchButton = ({
                        name,
                        size,
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
  const { value: aValue, onChange } = useConsumer();
  const currentValue = aValue[name];
  const [value, setValue] = useState(defaultValue || get(currentValue, "value"));
  const [active, setActive] = useState(defaultActive);
  const withTemplate = (value) => ({
    value, label: isFunction(template) ? template(value) : value.toString()
  });
  const ref = useClickOutSide(() => {
    setValue(get(currentValue, "value"));
    setActive(false);
    onBlur && onBlur();
  });

  const activeChangeRef = useRef(onActiveChange);
  activeChangeRef.current = onActiveChange;

  useEffect(() => {
    activeChangeRef.current && activeChangeRef.current(active);
  }, [active]);
  let timer;
  return <div className={classnames("react-filter-search-button", {
    "is-active": active
  })} ref={ref} onMouseEnter={() => {
    clearTimeout(timer);
    !active && setActive(true);
  }} onMouseLeave={() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      active && setActive(false);
    }, 200);
  }}>
    <div className="inner">
      <div>{children({ value, setValue, setActive })}</div>
      {active ? <Button className="react-filter-search-confirm" size="small" type="primary" onClick={(e) => {
        e.stopPropagation();
        if (onBeforeSearch && onBeforeSearch(value) === false) {
          return;
        }
        onChange(name, Number.isInteger(size) && size > 1 ? [withTemplate(value)] : withTemplate(value));
        setActive(false);
        onSearch && onSearch({ value });
      }}>{buttonText}</Button> : null}</div>
  </div>;
};

SearchButton.defaultProps = {
  defaultActive: false, buttonText: "确定"
};

export default SearchButton;