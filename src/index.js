import React, {cloneElement, useState, useMemo} from "react";
import {Space, Button, Divider, Tag, Row, Col} from "antd";
import City from "./City";
import List from "./List";
import Range from "./Range";
import Text from "./Text";
import Selector from "./Selector";
import Check from "./Check";
import {Provider} from "./context";
import FilterItem from "./FilterItem";
import "./index.scss";

const filterNull = (item) => {
    const target = Object.assign({}, item);
    Object.keys(target).forEach((key) => {
        const item = target[key];
        (() => {
            if (Array.isArray(item) && item.length > 0 && item.every((item) => item.value === void (0) || item.value === null || item.value === "")) {
                delete target[key];
                return;
            }
            if (Array.isArray(item) && item.length === 0) {
                delete target[key];
                return;
            }
            if (item && Array.isArray(item.value) && (item.value.length === 0 || item.value.every((item) => item === void (0) || item === null || item === ""))) {
                delete target[key];
                return;
            }
            if (item === void (0) || item === null || (!Array.isArray(item) && item && (item.value === void (0) || item.value === null || item.value === ""))) {
                delete target[key];
                return;
            }
        })();
    });
    return target;
};

const Filter = ({
                    displayLine,
                    defaultDisplay,
                    isExtra,
                    list,
                    label,
                    unfoldText,
                    foldText,
                    extra,
                    value: originValue,
                    onChange
                }) => {
    const value = useMemo(() => {
        return filterNull(originValue);
    }, [originValue]);
    const [display, setDisplay] = useState(defaultDisplay);
    const basicList = list.slice(0, displayLine), moreList = list.slice(displayLine);
    const renderList = (list) => list.map((item, index) => {
        return <Space key={index}>{item.map((item, index) => cloneElement(item, {key: index}))}</Space>;
    });
    const changeHandler = (name, item) => {
        const target = Object.assign({}, value, {[name]: item});
        onChange(filterNull(target));
    };

    return <Provider value={{
        value, onChange: changeHandler
    }}>
        <div className="react-filter">
            <div className="react-filter-inner">
                <div>
                    <Space>
                        <FilterItem className="react-filter-selected" label={label}>
                            {Object.keys(value).map((key) => {
                                const item = value[key];
                                if (!item) return null;
                                if (Array.isArray(item) && item.length === 0) return null;
                                return <Tag key={key} closable onClose={() => {
                                    changeHandler(key, null);
                                }}>{Array.isArray(item) ? item.map(({label}) => label).join(",") : item.label}</Tag>;
                            })}
                        </FilterItem>
                        <div>{extra}</div>
                    </Space>
                </div>
                {renderList(isExtra ? basicList : list)}
            </div>
            {display ? <><Divider className="react-filter-divider"/>
                    <div className="react-filter-inner">{renderList(moreList)}</div>
                </> :
                <div className="react-filter-divider-close"/>}
            {isExtra && list.length > displayLine ? <Row className="react-filter-switch-btn" justify="end">
                <Col><Button type="link" onClick={() => {
                    setDisplay((display) => !display);
                }}>{display ? foldText : unfoldText}</Button></Col>
            </Row> : null}
        </div>
    </Provider>;
};

Filter.type = {
    City, List, Range, Text, Selector, Check
};

Filter.defaultProps = {
    label: '?????????',
    unfoldText: '??????',
    foldText: '??????',
    displayLine: 2,
    defaultDisplay: false,
    isExtra: true,
    list: [[]],
    value: {},
    extra: null,
    onChange: () => {
    }
};

export {createExtraButton, withMoreExtraButton} from "./MoreExtraButton";

export {default as SearchButton} from "./SearchButton";

export {default as FilterItem, withFilterItem} from "./FilterItem";

export {useConsumer as useFilterContext} from './context';

export default Filter;
