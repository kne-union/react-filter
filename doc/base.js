const { default: Filter, fields } = _ReactFilter;
const {
  InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem,
  DateRangePickerFilterItem, TypeDateRangePickerFilterItem,
  SuperSelectFilterItem, SelectFunctionFilterItem,
  SelectIndustryFilterItem, SelectAddressFilterItem
} = fields;
const { Flex, Button, message } = antd;
const { useState } = React;

const departmentOptions = [
  { value: 'tech', label: '技术研发部' },
  { value: 'product', label: '产品设计部' },
  { value: 'operation', label: '运营管理部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'marketing', label: '市场营销部' }
];

const BaseExample = () => {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = Filter.getFilterValue(filterValue);
    message.info(`搜索参数: ${JSON.stringify(params, null, 2)}`);
    console.log('筛选参数:', params);
  };

  return (
    <Flex vertical gap={16}>
      <Filter
        value={filterValue}
        onChange={setFilterValue}
        list={[
          [
            {
              type: InputFilterItem,
              props: { name: 'keyword', label: '关键词', placeholder: '请输入关键词搜索' }
            },
            {
              type: NumberRangeFilterItem,
              props: { name: 'amount', label: '金额', unit: '元', min: 0, max: 999999 }
            },
            {
              type: DatePickerFilterItem,
              props: { name: 'createTime', label: '创建时间', format: 'YYYY-MM-DD' }
            },
            {
              type: DateRangePickerFilterItem,
              props: { name: 'dateRange', label: '日期范围', format: 'YYYY-MM-DD' }
            },
            {
              type: TypeDateRangePickerFilterItem,
              props: { name: 'typeDateRange', label: '快捷日期' }
            }
          ],
          [
            {
              type: SuperSelectFilterItem,
              props: { name: 'department', label: '部门', options: departmentOptions }
            },
            {
              type: SelectFunctionFilterItem,
              props: { name: 'function', label: '职能' }
            },
            {
              type: SelectIndustryFilterItem,
              props: { name: 'industry', label: '行业' }
            },
            {
              type: SelectAddressFilterItem,
              props: { name: 'city', label: '城市' }
            }
          ]
        ]}
        displayLine={1}
      />
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>{JSON.stringify(filterValue, null, 2)}</pre>
      </Flex>
    </Flex>
  );
};

render(<BaseExample />);
