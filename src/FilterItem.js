import classnames from 'classnames';
import { Space } from 'antd';
import style from './style.module.scss';
import withLocale from './withLocale';
import { FILTER_CLASS } from './filterClassNames';

const FilterItem = withLocale(({ open, active, label, children }) => {
  return (
    <Space className={classnames(style['filter-item-wrap'], FILTER_CLASS.itemWrap)}>
      <div
        className={classnames(style['filter-item'], FILTER_CLASS.item, {
          [style['is-active']]: active,
          [FILTER_CLASS.itemActive]: active,
          [style['is-visited']]: open,
          [FILTER_CLASS.itemVisited]: open
        })}
      >
        <Space className={classnames(style['filter-item-label'], FILTER_CLASS.itemLabel)} size={4}>
          <div>{label}</div>
          <span className={classnames(style['filter-item-icon'], FILTER_CLASS.itemIcon)}>▼</span>
        </Space>
        <div className={classnames(style['filter-item-field'], FILTER_CLASS.itemField)}>{children}</div>
      </div>
    </Space>
  );
});

export default FilterItem;
