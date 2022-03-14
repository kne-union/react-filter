import React, { createContext, useContext } from "react";
import { Button, message, Tag } from "antd";
import { useConsumer } from "../context";
import FilterItem from "../FilterItem";
import get from "lodash/get";
import isFunction from "lodash/isFunction";
import isEqual from "lodash/isEqual";

const { CheckableTag } = Tag;

const context = createContext({});

const { Provider } = context;

const List = ({ label, name, size, children, options, more }) => {
  const { value, onChange } = useConsumer();
  const currentValue = (() => {
    const originValue = get(value, name);
    if (size === 1) {
      return originValue !== void (0) ? [originValue] : [];
    } else {
      return originValue || [];
    }
  })();

  const changeHandler = (value) => {
    if (size === 1) {
      return onChange(name, value[0]);
    } else {
      return onChange(name, value);
    }
  };
  const createCheckedChangeHandler = (value) => (checked) => {
    if (checked) {
      let newList = currentValue.slice(0);
      if (currentValue.length < size) {
        newList.push(value);
      }
      if (currentValue.length === size && size === 1) {
        newList = [value];
      }
      if (currentValue.length >= size && size > 1) {
        message.error(`最多选择${size}个`);
        return;
      }
      changeHandler(newList);
    } else {
      const newList = currentValue.slice(0);
      newList.splice(currentValue.indexOf(value), 1);
      changeHandler(newList);
    }
  };
  const computedChildren = (() => {
    if (Array.isArray(options)) {
      return options.map(({ label, value }) => <List.Item key={value} value={value} label={label} />);
    }
    if (isFunction(children)) {
      return children({ value: currentValue, onChange: changeHandler });
    }
    return children;
  })();
  return <FilterItem label={label}>
    <Provider value={{
      currentValue, createCheckedChangeHandler
    }}>
      {computedChildren}
      {more ? (() => {
        if (isFunction(more)) {
          return more({ name, size, label, value: currentValue, onChange: changeHandler });
        }
        const { children, onClick } = more;
        return <List.Item {...more} onClick={(e) => {
          onClick({ name, label, value: currentValue, onChange: changeHandler }, e);
        }} label={children || "其他"} />;
      })() : null}
    </Provider>
  </FilterItem>;
};

List.Item = ({ value, label, ...props }) => {
  const { currentValue, createCheckedChangeHandler } = useContext(context);
  const itemProps = {};
  if (value !== void (0)) {
    itemProps.checked = currentValue.findIndex((item) => isEqual(get(item,'value'), value)) > -1;
    itemProps.onChange = createCheckedChangeHandler({ label, value });
  }

  return <CheckableTag {...props} {...itemProps}>{label}</CheckableTag>;
};

List.defaultProps = {
  size: 2
};

export default List;
