import { Button, Space, Tag } from 'antd';
import style from './style.module.scss';
import classnames from 'classnames';
import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';

const FilterValueDisplay = withLocale(({ value: filterValue, extraExpand, onChange }) => {
  const { formatMessage } = useIntl({ moduleName: 'Filter' });

  return (
    <Space className={style['filter-title']} align="top" size={16}>
      <span className={style['filter-label']}>{formatMessage({ id: 'selectedText' })}</span>
      <div className={style['filter-line']}>
        {filterValue.map(({ name, label, value }, index) => {
          const valueLabel = Array.isArray(value) ? value.map(item => item.label).join('，') : value?.label;
          return (
            <Tag
              key={name}
              closable
              className={style['filter-value-tag']}
              onClose={() => {
                const newValue = filterValue.slice(0);
                newValue.splice(index, 1);
                onChange(newValue);
              }}
            >
              <span className={style['filter-value-tag-label']}>{label}:</span>
              <span className={style['filter-value-tag-content']}>{valueLabel}</span>
            </Tag>
          );
        })}
        <Space size={4} className={classnames(style['un-expand-shadow'])}>
          {extraExpand}
          <Button size="small">{formatMessage({ id: 'clearAllText' })}</Button>
        </Space>
        <Space size={4} className={classnames(style['un-expand'])}>
          {extraExpand}
          <Button
            size="small"
            onClick={() => {
              onChange([]);
            }}
          >
            {formatMessage({ id: 'clearAllText' })}
          </Button>
        </Space>
      </div>
    </Space>
  );
});

export default FilterValueDisplay;
