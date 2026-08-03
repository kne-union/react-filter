const { default: Filter, fields, FILTER_CLASS, getFilterValue } = _ReactFilter;
const { InputFilterItem, SuperSelectFilterItem } = fields;
const { Flex, Button, Typography, Card, Space } = antd;
const { useState, useEffect } = React;

const statusOptions = [
  { value: 'open', label: '开启' },
  { value: 'closed', label: '关闭' }
];

/**
 * 用稳定全局类名定制 Filter 内部样式。
 * 根：react-filter；内部短类名；选择器写 .react-filter .xxx
 */
const CUSTOM_CSS = `
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.title} {
  padding: 12px 16px;
  background: #f7f9fc;
  border-bottom-color: #d6e4ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.label} {
  color: #1d39c4;
  font-weight: 600;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.item} {
  border-radius: 6px;
  border-color: #adc6ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.item}.${FILTER_CLASS.itemActive} {
  color: #1d39c4;
  border-color: #2f54eb;
  background: #f0f5ff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueDisplay} {
  background: #fcfcff;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueTag} {
  border-radius: 4px;
  border-color: #adc6ff;
  background: #f0f5ff;
  color: #1d39c4;
}
.demo-filter-skin.${FILTER_CLASS.root} .${FILTER_CLASS.valueClear} {
  border-radius: 4px;
  color: #1d39c4;
  border-color: #adc6ff;
}
`;

const BaseExample = () => {
  const [filter, setFilter] = useState([
    { name: 'status', label: '状态', value: { label: '开启', value: 'open' } }
  ]);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-demo', 'filter-classname');
    styleEl.textContent = CUSTOM_CSS;
    document.head.appendChild(styleEl);
    return () => {
      styleEl.remove();
    };
  }, []);

  return (
    <Flex vertical gap={16}>
      <Card size="small" title="说明">
        <Typography.Paragraph style={{ marginBottom: 8 }}>
          根挂 <Typography.Text code>{FILTER_CLASS.root}</Typography.Text>
          ，内部短类名如 <Typography.Text code>{FILTER_CLASS.title}</Typography.Text> /{' '}
          <Typography.Text code>{FILTER_CLASS.item}</Typography.Text>。用{' '}
          <Typography.Text code>.{FILTER_CLASS.root} .{FILTER_CLASS.item}</Typography.Text> 定制。
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          本示例额外加了 <Typography.Text code>demo-filter-skin</Typography.Text> 作为页面作用域，避免污染其他示例。
        </Typography.Text>
      </Card>
      <Filter
        className="demo-filter-skin"
        value={filter}
        onChange={setFilter}
        list={[
          [
            { type: InputFilterItem, props: { name: 'keyword', label: '关键词', placeholder: '搜索' } },
            {
              type: SuperSelectFilterItem,
              props: {
                name: 'status',
                label: '状态',
                single: true,
                isPopup: true,
                options: statusOptions
              }
            },
            { type: InputFilterItem, props: { name: 'owner', label: '负责人' } }
          ]
        ]}
        displayLine={1}
        extra={
          <Button
            type="primary"
            onClick={() => {
              console.log(getFilterValue(filter));
            }}
          >
            搜索
          </Button>
        }
      />
      <Space>
        <Typography.Text type="secondary">当前筛选参数：</Typography.Text>
        <Typography.Text code>{JSON.stringify(getFilterValue(filter))}</Typography.Text>
      </Space>
    </Flex>
  );
};

render(<BaseExample />);
