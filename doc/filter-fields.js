const { fields, PopoverItem } = _ReactFilter;
const { InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem, DateRangePickerFilterItem, TypeDateRangePickerFilterItem } = fields;
const { Input, InputNumber, Space, Flex, Select } = antd;
const { useState } = React;

// 自定义下拉选择筛选项
const SelectFilterItem = ({ label, value, onChange, options = [] }) => {
  return (
    <PopoverItem
      label={label}
      value={value}
      onChange={onChange}
    >
      {({ value, onChange }) => (
        <Select
          style={{ width: 200 }}
          placeholder={`请选择${label}`}
          value={value?.value}
          onChange={(val, option) => {
            onChange({
              value: val,
              label: option?.label || val
            });
          }}
          options={options}
        />
      )}
    </PopoverItem>
  );
};

const FilterFieldsExample = () => {
  const [values, setValues] = useState({});

  const fieldConfigs = [
    {
      name: 'input',
      label: '输入筛选',
      component: InputFilterItem,
      props: {}
    },
    {
      name: 'numberRange',
      label: '数字区间',
      component: NumberRangeFilterItem,
      props: { unit: '万', min: 0 }
    },
    {
      name: 'date',
      label: '日期选择',
      component: DatePickerFilterItem,
      props: { picker: 'date' }
    },
    {
      name: 'month',
      label: '月份选择',
      component: DatePickerFilterItem,
      props: { picker: 'month' }
    },
    {
      name: 'dateRange',
      label: '日期范围',
      component: DateRangePickerFilterItem,
      props: {}
    },
    {
      name: 'typeDateRange',
      label: '类型日期范围',
      component: TypeDateRangePickerFilterItem,
      props: {}
    },
    {
      name: 'select',
      label: '下拉选择',
      component: SelectFilterItem,
      props: {
        options: [
          { value: 'pending', label: '待处理' },
          { value: 'processing', label: '处理中' },
          { value: 'completed', label: '已完成' },
          { value: 'cancelled', label: '已取消' }
        ]
      }
    }
  ];

  return (
    <Flex vertical gap={24}>
      <h4>筛选字段组件展示</h4>
      <Flex wrap gap={16}>
        {fieldConfigs.map(({ name, label, component: Component, props }) => (
          <Component
            key={name}
            label={label}
            value={values[name]}
            onChange={(val) => setValues(prev => ({ ...prev, [name]: val }))}
            {...props}
          />
        ))}
      </Flex>
      <Flex gap={8}>
        <span>当前值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<FilterFieldsExample />);
