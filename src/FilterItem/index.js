import React, {useRef, useEffect, useState} from "react";
import {Space, Popover} from "antd";
import classnames from 'classnames';
import {useConsumer} from '../context';

const PopContent = (props) => {
    const [visible, setVisible] = useState(false);
    const {emitter} = useConsumer();
    useEffect(() => {
        emitter.addListener('change', () => {
            setVisible(false);
        });
    }, []);
    return <Popover {...props} visible={visible} onVisibleChange={setVisible}/>
};

const FilterItem = ({className, label, labelHidden, isMore, moreTrigger, onClick, children}) => {
    if (isMore) {
        return <div className={classnames("react-filter-item-label", "is-more", className)}>
            {children ? <PopContent content={children} trigger={moreTrigger} placement="bottom"
                                    overlayClassName="react-filter-item-popover">
                <a className="react-filter-item-more">{label}</a>
            </PopContent> : <a className="react-filter-item-more" onClick={onClick}>{label}</a>}
        </div>;
    }
    return <Space className={classnames('react-filter-item', className)}>
        {labelHidden ? null : <div className="react-filter-item-label">{label}:</div>}
        <div className="react-filter-item-children">{children}</div>
    </Space>;
};

export const withFilterItem = (WrappedComponent) => ({label, labelHidden, isMore, moreTrigger, ...props}) => {
    return <FilterItem label={label} labelHidden={labelHidden} isMore={isMore} moreTrigger={moreTrigger}>
        <WrappedComponent {...props} label={label} isMore={isMore}/>
    </FilterItem>
};

export default FilterItem;
