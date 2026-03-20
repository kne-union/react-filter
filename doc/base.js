const { default: Filter, fields } = _ReactFilter;
const { InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem, DateRangePickerFilterItem } = fields;
const { Flex, Button, message } = antd;
const { useState } = React;

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
              props: {
                name: 'keyword',
                label: '关键词',
                placeholder: '请输入关键词搜索'
              }
            },
            {
              type: NumberRangeFilterItem,
              props: {
                name: 'amount',
                label: '金额',
                unit: '元',
                min: 0,
                max: 999999
              }
            },
            {
              type: DatePickerFilterItem,
              props: {
                name: 'createTime',
                label: '创建时间',
                format: 'YYYY-MM-DD'
              }
            }
          ],
          [
            {
              type: DateRangePickerFilterItem,
              props: {
                name: 'dateRange',
                label: '日期范围',
                format: 'YYYY-MM-DD'
              }
            }
          ]
        ]}
        displayLine={1}
        extra={
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        }
      />
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>{JSON.stringify(filterValue, null, 2)}</pre>
      </Flex>
    </Flex>
  );
};

render(<BaseExample />);
