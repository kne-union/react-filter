const { PopoverItem } = _ReactFilter;
const { Input, InputNumber, Space, Select, Radio, Flex } = antd;
const { useState } = React;

const PopoverItemExample = () => {
  const [inputValue, setInputValue] = useState(null);
  const [numberValue, setNumberValue] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
  const [rangeValue, setRangeValue] = useState(null);

  return (
    <Flex vertical gap={24}>
      <h4>弹出层筛选组件示例</h4>
      <Flex wrap gap={16}>
        {/* 输入框筛选 */}
        <PopoverItem
          label="文本输入"
          value={inputValue}
          onChange={setInputValue}
        >
          {({ value, onChange }) => (
            <Input
              style={{ width: 240 }}
              placeholder="请输入文本"
              value={value?.value || ''}
              onChange={(e) => onChange(
                e.target.value ? { label: e.target.value, value: e.target.value } : null
              )}
            />
          )}
        </PopoverItem>

        {/* 数字输入筛选 */}
        <PopoverItem
          label="数字输入"
          value={numberValue}
          onChange={setNumberValue}
          onValidate={(val) => val?.value !== undefined}
        >
          {({ value, onChange }) => (
            <InputNumber
              style={{ width: 240 }}
              placeholder="请输入数字"
              value={value?.value}
              onChange={(val) => onChange(
                val !== null ? { label: String(val), value: val } : null
              )}
            />
          )}
        </PopoverItem>

        {/* 下拉选择筛选 */}
        <PopoverItem
          label="状态选择"
          value={selectValue}
          onChange={setSelectValue}
        >
          {({ value, onChange }) => (
            <Select
              style={{ width: 240 }}
              placeholder="请选择状态"
              value={value?.value}
              onChange={(val, option) => onChange({
                value: val,
                label: option?.label || val
              })}
              options={[
                { value: 'active', label: '激活' },
                { value: 'inactive', label: '未激活' },
                { value: 'pending', label: '待处理' }
              ]}
            />
          )}
        </PopoverItem>

        {/* 数字范围筛选 */}
        <PopoverItem
          label="数值范围"
          value={rangeValue}
          onChange={setRangeValue}
          onValidate={(val) => {
            const range = val?.value;
            return !(range && range[0] !== undefined && range[1] !== undefined && range[1] < range[0]);
          }}
        >
          {({ value, onChange }) => (
            <Space.Compact>
              <InputNumber
                style={{ width: 100 }}
                placeholder="最小值"
                value={value?.value?.[0]}
                onChange={(val) => onChange({
                  label: `${val || '?'}-${value?.value?.[1] || '?'}`,
                  value: [val, value?.value?.[1]]
                })}
              />
              <Input
                style={{ width: 30, textAlign: 'center', borderLeft: 0, borderRight: 0 }}
                placeholder="~"
                disabled
              />
              <InputNumber
                style={{ width: 100 }}
                placeholder="最大值"
                value={value?.value?.[1]}
                onChange={(val) => onChange({
                  label: `${value?.value?.[0] || '?'}-${val || '?'}`,
                  value: [value?.value?.[0], val]
                })}
              />
            </Space.Compact>
          )}
        </PopoverItem>
      </Flex>

      <Flex vertical gap={8}>
        <h5>当前值:</h5>
        <pre style={{ margin: 0, background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
          {JSON.stringify({
            文本输入: inputValue,
            数字输入: numberValue,
            状态选择: selectValue,
            数值范围: rangeValue
          }, null, 2)}
        </pre>
      </Flex>
    </Flex>
  );
};

render(<PopoverItemExample />);
