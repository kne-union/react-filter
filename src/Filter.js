import React, {cloneElement, useState, useMemo} from "react";
import {Button, Col, Divider, Row, Space, Tag} from "antd";
import useEvent from '@kne/use-event';
import {Provider} from "./context";
import FilterItem from "./FilterItem";
import City from "./City";
import List from "./List";
import Range from "./Range";
import Text from "./Text";
import Selector from "./Selector";
import Check from "./Check";
import RadioList from "./RadioList";
import CheckboxList from "./CheckboxList";
import DateTime from './DateTime';

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
                    labelHidden,
                    itemLabelHidden,
                    unfoldText,
                    foldText,
                    extra,
                    more,
                    moreTrigger,
                    moreLabel,
                    value: originValue,
                    onChange
                }) => {
    const value = useMemo(() => {
        return filterNull(originValue);
    }, [originValue]);
    const emitter = useEvent();
    const [display, setDisplay] = useState(defaultDisplay);
    const basicList = list.slice(0, displayLine), moreList = list.slice(displayLine);
    const renderList = (list) => list.map((item, index) => {
        return <Space key={index}
                      className="react-filter-line">{item.map((item, index) => cloneElement(item, {
            key: index,
            labelHidden: itemLabelHidden
        }))}</Space>;
    });
    const changeHandler = (name, item) => {
        const target = Object.assign({}, value, {[name]: item});
        const output = filterNull(target);
        emitter.emit('change', output);
        onChange(output);
    };

    const moreFilter = more && more.length > 0 ? <Space className="react-filter-line is-more">
        <Space className="react-filter-item">
            <div className="react-filter-item-label">{moreLabel}:</div>
            <Space className="react-filter-item-children" split={<Divider type="vertical"/>}>
                {more.map((item, index) => cloneElement(item, {
                    key: index,
                    isMore: true,
                    moreTrigger
                }))}
            </Space>
        </Space>
    </Space> : null;

    return <Provider value={{
        value, onChange: changeHandler, emitter
    }}>
        <div className="react-filter">
            <div className="react-filter-inner">
                <div>
                    {labelHidden ? null : <Space>
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
                    </Space>}
                </div>
                {renderList(isExtra ? basicList : list)}
                {moreList.length === 0 || isExtra === false ? moreFilter : null}
            </div>
            {display && isExtra ? <><Divider className="react-filter-divider"/>
                    <div className="react-filter-inner">{renderList(moreList)}</div>
                    {moreList.length > 0 ? moreFilter : null}
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
    City, List, Range, Text, Selector, Check, RadioList, CheckboxList, DateTime
};

Filter.defaultProps = {
    label: '筛选项',
    labelHidden: false,
    itemLabelHidden: false,
    unfoldText: '展开',
    foldText: '收起',
    displayLine: 2,
    defaultDisplay: false,
    isExtra: true,
    list: [[]],
    more: [],
    moreTrigger: 'hover',
    moreLabel: '更多',
    value: {},
    extra: null,
    onChange: () => {
    }
};

export default Filter;
