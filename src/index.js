import React, { cloneElement, useState } from "react";
import { Space, Button, Divider, Tag, Row, Col } from "antd";
import City from "./City";
import List from "./List";
import Range from "./Range";
import Text from "./Text";
import Selector from "./Selector";
import Check from "./Check";
import { Provider } from "./context";
import FilterItem from "./FilterItem";
import "./index.scss";

const Filter = ({ displayLine, list, value, onChange }) => {
  const [display, setDisplay] = useState(false);
  const basicList = list.slice(0, displayLine), moreList = list.slice(displayLine);
  const renderList = (list) => list.map((item, index) => {
    return <Space key={index}>{item.map((item, index) => cloneElement(item, { key: index }))}</Space>;
  });
  const changeHandler = (name, item) => {
    const target = Object.assign({}, value, { [name]: item });
    Object.keys(target).forEach((key) => {
      const item = target[key];
      if (item === void (0) || item === null) {
        delete target[key];
      }
      if (Array.isArray(item) && item.length === 0) {
        delete target[key];
      }
    });
    onChange(target);
  };
  return <Provider value={{
    value, onChange: changeHandler
  }}>
    <Space className="space-full" direction="vertical">
      <FilterItem label="筛选项">{Object.keys(value).map((key) => {
        const item = value[key];
        if (!item) return null;
        if (Array.isArray(item) && item.length === 0) return null;
        return <Tag key={key} closable onClose={() => {
          changeHandler(key, null);
        }}>{Array.isArray(item) ? item.map(({ label }) => label).join(",") : item.label}</Tag>;
      })}</FilterItem>
      {renderList(basicList)}
      {display ? <><Divider className="react-filter-divider" />{renderList(moreList)}</> : null}
      <Row justify="end">
        <Col><Button type="link" onClick={() => {
          setDisplay((display) => !display);
        }}>{display ? "收起更多条件" : "展开更多"}</Button></Col>
      </Row>
    </Space>
  </Provider>;
};

Filter.type = {
  City, List, Range, Text, Selector, Check
};

Filter.defaultProps = {
  displayLine: 2, list: [[]], value: {}, onChange: () => {
  }
};

export { createExtraButton, withMoreExtraButton } from "./MoreExtraButton";

export { default as SearchButton } from "./SearchButton";

export { default as FilterItem, withFilterItem } from "./FilterItem";

export default Filter;