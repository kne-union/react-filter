const { fields, PopoverItem } = _ReactFilter;
const {
  InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem,
  DateRangePickerFilterItem, TypeDateRangePickerFilterItem,
  SuperSelectFilterItem, SelectFunctionFilterItem,
  SelectIndustryFilterItem, SelectAddressFilterItem
} = fields;
const { Input, InputNumber, Space, Flex, Select, Divider, Tag } = antd;
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

// SuperSelect 业务选择器示例
const departmentOptions = [
  { value: 'tech', label: '技术研发部' },
  { value: 'product', label: '产品设计部' },
  { value: 'operation', label: '运营管理部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'marketing', label: '市场营销部' }
];

const SuperSelectExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>SuperSelect 业务选择器</h4>
        <Tag color="blue">单选/多选</Tag>
        <Tag color="blue">搜索</Tag>
        <Tag color="blue">全选</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select 的通用选择器筛选项，支持单选/多选、搜索、全选等功能
      </p>
      <Flex wrap gap={16}>
        <SuperSelectFilterItem
          label="部门（多选）"
          value={values.dept}
          onChange={(val) => setValues(prev => ({ ...prev, dept: val }))}
          options={departmentOptions}
        />
        <SuperSelectFilterItem
          label="状态（单选）"
          single
          value={values.status}
          onChange={(val) => setValues(prev => ({ ...prev, status: val }))}
          options={[
            { value: 'active', label: '启用' },
            { value: 'inactive', label: '停用' }
          ]}
        />
        <SuperSelectFilterItem
          label="角色（全选）"
          value={values.role}
          onChange={(val) => setValues(prev => ({ ...prev, role: val }))}
          options={[
            { value: 'admin', label: '管理员' },
            { value: 'editor', label: '编辑者' },
            { value: 'viewer', label: '查看者' }
          ]}
          allowSelectedAll
        />
      </Flex>
      <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
        {JSON.stringify(values, null, 2)}
      </pre>
    </Flex>
  );
};

// 业务选择器示例（职能/行业/城市）
const BusinessSelectExample = () => {
  const [values, setValues] = useState({});

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={8}>
        <h4 style={{ margin: 0 }}>业务选择器筛选项</h4>
        <Tag color="blue">多级数据</Tag>
        <Tag color="blue">拼音搜索</Tag>
        <Tag color="blue">国际化</Tag>
      </Flex>
      <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
        基于 @kne/super-select-plus 的职能、行业、城市选择器，支持多级数据、拼音搜索、国际化
      </p>
      <Flex wrap gap={16}>
        <SelectFunctionFilterItem
          label="职能"
          value={values.function}
          onChange={(val) => setValues(prev => ({ ...prev, function: val }))}
        />
        <SelectIndustryFilterItem
          label="行业"
          value={values.industry}
          onChange={(val) => setValues(prev => ({ ...prev, industry: val }))}
        />
        <SelectAddressFilterItem
          label="城市（多选）"
          value={values.city}
          onChange={(val) => setValues(prev => ({ ...prev, city: val }))}
        />
        <SelectAddressFilterItem
          label="城市（单选）"
          single
          value={values.singleCity}
          onChange={(val) => setValues(prev => ({ ...prev, singleCity: val }))}
        />
      </Flex>
    </Flex>
  );
};

render(<FilterFieldsExample />);
render(<Divider />);
render(<SuperSelectExample />);
render(<Divider />);
render(<BusinessSelectExample />);
