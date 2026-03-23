const { AdvancedFilter } = _ReactFilter;
const { InputFilterItem, ListFilterItem, CityFilterItem } = AdvancedFilter.fields;
const { Flex, Button, message } = antd;
const { useState } = React;

const AdvancedFilterExample = () => {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = {};
    filterValue.forEach(item => {
      params[item.name] = Array.isArray(item.value)
        ? item.value.map(v => v.value)
        : item.value?.value;
    });
    message.info(`搜索参数: ${JSON.stringify(params, null, 2)}`);
    console.log('筛选参数:', params);
  };

  return (
    <Flex vertical gap={16}>
      <AdvancedFilter
        value={filterValue}
        onChange={setFilterValue}
        list={[
          [
            {
              type: InputFilterItem,
              props: {
                name: 'name',
                label: '姓名'
              }
            },
            {
              type: InputFilterItem,
              props: {
                name: 'phone',
                label: '手机号'
              }
            }
          ],
          [
            {
              type: ListFilterItem,
              props: {
                name: 'status',
                label: '状态',
                single: true,
                items: [
                  { label: '待处理', value: 'pending' },
                  { label: '处理中', value: 'processing' },
                  { label: '已完成', value: 'completed' },
                  { label: '已取消', value: 'cancelled' }
                ]
              }
            }
          ],
          [
            {
              type: ListFilterItem,
              props: {
                name: 'tags',
                label: '标签',
                single: false,
                maxLength: 3,
                items: [
                  { label: '前端', value: 'frontend' },
                  { label: '后端', value: 'backend' },
                  { label: '全栈', value: 'fullstack' },
                  { label: 'UI设计', value: 'ui' },
                  { label: '产品', value: 'product' }
                ]
              }
            }
          ],
          [
            {
              type: CityFilterItem,
              props: {
                name: 'city',
                label: '城市',
                maxLength: 3
              }
            }
          ]
        ]}
      />
      <Flex justify="end">
        <Button type="primary" onClick={handleSearch}>
          查询
        </Button>
      </Flex>
      <Flex gap={8}>
        <span>当前筛选值:</span>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 8, borderRadius: 4, flex: 1 }}>
          {JSON.stringify(filterValue, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<AdvancedFilterExample />);
