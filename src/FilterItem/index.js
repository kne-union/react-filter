import React from "react";
import {Space, Popover} from "antd";
import classnames from 'classnames';

const FilterItem = ({className, label, labelHidden, isMore, moreTrigger, children}) => {
    if (isMore) {
        return <div className={classnames("react-filter-item-label", "is-more", className)}>
            <Popover content={children} trigger={moreTrigger} placement="bottom" overlayClassName="react-filter-item-popover">
                <a>{label}</a>
            </Popover>

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
