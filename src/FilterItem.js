import classnames from 'classnames';
import { Space } from 'antd';
import style from './style.module.scss';
import withLocale from './withLocale';

const FilterItem = withLocale(({ open, active, label, children }) => {
  return (
    <Space className={style['filter-item-wrap']}>
      <div
        className={classnames(style['filter-item'], {
          [style['is-active']]: active,
          [style['is-visited']]: open
        })}
      >
        <Space className={style['filter-item-label']} size={4}>
          <div>{label}</div>
          <span className={style['filter-item-icon']}>▼</span>
        </Space>
        <div className={style['filter-item-field']}>{children}</div>
      </div>
    </Space>
  );
});

export default FilterItem;
