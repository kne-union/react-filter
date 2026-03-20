### Filter 主组件

筛选组件，用于展示筛选项和处理筛选条件。

#### 属性

| 属性           | 类型                                                   | 默认值    | 说明              |
|--------------|------------------------------------------------------|--------|-----------------|
| value        | `Array<{ name: string, label: string, value: any }>` | -      | 筛选值数组           |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]`   | 默认筛选值           |
| onChange     | `(value: Array) => void`                             | -      | 筛选值变化回调         |
| list         | `Array<Array>`                                       | `[]`   | 筛选项配置数组，支持多行    |
| displayLine  | `number`                                             | `1`    | 默认展示的行数，超出部分折叠  |
| label        | `string`                                             | `'筛选'` | 筛选区域标题          |
| extra        | `ReactNode`                                          | -      | 额外操作区域，通常放置搜索按钮 |
| extraExpand  | `ReactNode`                                          | -      | 已选区域额外内容        |
| className    | `string`                                             | -      | 自定义类名           |

#### 静态方法

| 方法                                   | 说明                                         |
|--------------------------------------|--------------------------------------------|
| `Filter.getFilterValue(filterValue)` | 将筛选值数组转换为参数对象，如 `{ name: value }`          |
| `Filter.useFilter()`                 | 获取 Filter Context，返回 `{ value, onChange }` |

#### 使用示例

```javascript
import Filter, { fields } from '@kne/react-filter';

const { InputFilterItem, NumberRangeFilterItem } = fields;

<Filter
  value={filterValue}
  onChange={setFilterValue}
  list={[
    [
      { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } },
      { type: NumberRangeFilterItem, props: { name: 'amount', label: '金额' } }
    ]
  ]}
  displayLine={1}
  extra={<Button type="primary">搜索</Button>}
/>
```

---

### AdvancedFilter 高级筛选组件

高级筛选组件，用于更复杂的筛选场景，采用垂直布局。

#### 属性

| 属性           | 类型                                                   | 默认值  | 说明       |
|--------------|------------------------------------------------------|------|----------|
| value        | `Array<{ name: string, label: string, value: any }>` | -    | 筛选值数组    |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]` | 默认筛选值    |
| onChange     | `(value: Array) => void`                             | -    | 筛选值变化回调  |
| list         | `Array<Array>`                                       | `[]` | 筛选项配置数组  |
| more         | `Array`                                              | -    | 额外折叠的筛选项 |
| className    | `string`                                             | -    | 自定义类名    |

#### 使用示例

```javascript
import { AdvancedFilter, fields } from '@kne/react-filter';

<AdvancedFilter
  value={filterValue}
  onChange={setFilterValue}
  list={[
    [
      { type: InputFilterItem, props: { name: 'name', label: '姓名' } }
    ]
  ]}
/>
```

---

### FilterValueDisplay 已选值展示

展示已选择的筛选条件，支持单独删除和清空全部。

#### 属性

| 属性          | 类型                                                   | 默认值 | 说明      |
|-------------|------------------------------------------------------|-----|---------|
| value       | `Array<{ name: string, label: string, value: any }>` | -   | 筛选值数组   |
| onChange    | `(value: Array) => void`                             | -   | 筛选值变化回调 |
| extraExpand | `ReactNode`                                          | -   | 额外展示内容  |

---

### PopoverItem 弹出层筛选项

弹出层形式的筛选项，支持确认取消操作。

#### 属性

| 属性               | 类型                                          | 默认值            | 说明        |
|------------------|---------------------------------------------|----------------|-----------|
| label            | `string`                                    | -              | 筛选项标签     |
| value            | `{ label: string, value: any }`             | -              | 当前值       |
| onChange         | `(value: object) => void`                   | -              | 值变化回调     |
| onValidate       | `(value: object) => boolean`                | -              | 确认按钮校验函数  |
| onOpenChange     | `(open: boolean) => void`                   | -              | 弹出层状态变化回调 |
| placement        | `string`                                    | `'bottomLeft'` | 弹出层位置     |
| overlayClassName | `string`                                    | -              | 弹出层自定义类名  |
| children         | `(props: { value, onChange }) => ReactNode` | -              | 内容渲染函数    |

#### 使用示例

```javascript
import { PopoverItem } from '@kne/react-filter';

<PopoverItem
  label="文本输入"
  value={inputValue}
  onChange={setInputValue}
>
  {({ value, onChange }) => (
    <Input
      value={value?.value}
      onChange={(e) => onChange({ label: e.target.value, value: e.target.value })}
    />
  )}
</PopoverItem>
```

---

### FilterItem 筛选项容器

筛选项的基础容器组件。

#### 属性

| 属性       | 类型          | 默认值 | 说明         |
|----------|-------------|-----|------------|
| label    | `string`    | -   | 筛选项标签      |
| open     | `boolean`   | -   | 是否展开状态     |
| active   | `boolean`   | -   | 是否激活状态（有值） |
| children | `ReactNode` | -   | 子元素        |

---

### FilterLines 筛选行

筛选行组件，支持多行展开收起。

#### 属性

| 属性          | 类型             | 默认值    | 说明      |
|-------------|----------------|--------|---------|
| list        | `Array<Array>` | `[]`   | 筛选项配置数组 |
| displayLine | `number`       | `1`    | 默认展示行数  |
| label       | `string`       | `'筛选'` | 标题      |
| extra       | `ReactNode`    | -      | 额外操作区域  |
| className   | `string`       | -      | 自定义类名   |

---

### FilterProvider 状态管理

Filter 状态管理组件，用于自定义 Filter 结构。

#### 属性

| 属性           | 类型                                    | 默认值  | 说明       |
|--------------|---------------------------------------|------|----------|
| value        | `Array`                               | -    | 筛选值数组    |
| defaultValue | `Array`                               | `[]` | 默认筛选值    |
| onChange     | `(value: Array) => void`              | -    | 筛选值变化回调  |
| children     | `ReactNode \| (context) => ReactNode` | -    | 子元素或渲染函数 |

---

### 高阶组件

#### withFilterValue

为组件注入筛选值和变更函数。

```javascript
import { withFilterValue } from '@kne/react-filter';

const MyFilterItem = withFilterValue(({ name, label, value, onChange, ...props }) => {
  return <Component value={value} onChange={onChange}/>;
});
```

#### withFieldItem

为组件包装 FilterItem 样式。

```javascript
import { withFieldItem } from '@kne/react-filter';

const MyFieldItem = withFieldItem(MyComponent);
```

---

### 筛选字段组件

#### InputFilterItem 输入筛选

弹出层形式的输入框筛选组件。

| 属性          | 类型                   | 默认值 | 说明     |
|-------------|----------------------|-----|--------|
| name        | `string`             | -   | 字段名称   |
| label       | `string`             | -   | 标签     |
| placeholder | `string`             | -   | 占位符    |
| onValidate  | `(value) => boolean` | -   | 确认校验函数 |

#### NumberRangeFilterItem 数字区间筛选

数字区间输入筛选组件。

| 属性          | 类型       | 默认值 | 说明   |
|-------------|----------|-----|------|
| name        | `string` | -   | 字段名称 |
| label       | `string` | -   | 标签   |
| unit        | `string` | -   | 单位   |
| min         | `number` | -   | 最小值  |
| max         | `number` | -   | 最大值  |
| placeholder | `string` | -   | 占位符  |

#### DatePickerFilterItem 日期筛选

日期选择筛选组件。

| 属性     | 类型                                                   | 默认值            | 说明    |
|--------|------------------------------------------------------|----------------|-------|
| name   | `string`                                             | -              | 字段名称  |
| label  | `string`                                             | -              | 标签    |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'date'`       | 选择器类型 |
| format | `string`                                             | `'YYYY-MM-DD'` | 日期格式  |

#### DateRangePickerFilterItem 日期范围筛选

日期范围选择筛选组件。

| 属性     | 类型                                  | 默认值            | 说明   |
|--------|-------------------------------------|----------------|------|
| name   | `string`                            | -              | 字段名称 |
| label  | `string`                            | -              | 标签   |
| format | `string`                            | `'YYYY-MM-DD'` | 日期格式 |
| header | `ReactNode \| (props) => ReactNode` | -              | 头部内容 |

#### TypeDateRangePickerFilterItem 类型日期范围筛选

支持按日/周/月切换的日期范围选择筛选组件。

| 属性     | 类型       | 默认值            | 说明   |
|--------|----------|----------------|------|
| name   | `string` | -              | 字段名称 |
| label  | `string` | -              | 标签   |
| format | `string` | `'YYYY-MM-DD'` | 日期格式 |

---

### TypeDateRangePickerField 类型日期范围选择器

支持按日/周/月切换的日期范围选择器基础组件。

| 属性              | 类型                                                         | 默认值                             | 说明       |
|-----------------|------------------------------------------------------------|---------------------------------|----------|
| value           | `{ type: string, value: [Date, Date] }`                    | -                               | 当前值      |
| defaultValue    | `{ type: string, value: [Date, Date] }`                    | `{ type: 'date', value: null }` | 默认值      |
| onChange        | `(value: object) => void`                                  | -                               | 值变化回调    |
| shortcuts       | `boolean`                                                  | `true`                          | 是否显示快捷选项 |
| shortcutOptions | `Array<{ label: string, getValue: () => [Dayjs, Dayjs] }>` | -                               | 自定义快捷选项  |

**value 结构：**

```typescript
interface TypeDateRangeValue {
  type: 'date' | 'week' | 'month';  // 日期类型
  value: [Date, Date] | null;       // 日期范围 [开始时间, 结束时间]
}
```

**默认快捷选项：**

- 近7天：`dayjs().subtract(7, 'day')` 至今天
- 本月：本月第一天至最后一天
- 近三个月：`dayjs().subtract(3, 'month')` 至今天
- 当年：本年第一天至最后一天

**自定义快捷选项示例：**

```javascript
import { TypeDateRangePickerField } from '@kne/react-filter';

<TypeDateRangePickerField
  shortcuts={true}
  shortcutOptions={[
    {
      label: '最近一周',
      getValue: () => [dayjs().subtract(7, 'day').startOf('day'), dayjs().endOf('day')]
    },
    {
      label: '最近一月',
      getValue: () => [dayjs().subtract(1, 'month').startOf('day'), dayjs().endOf('day')]
    }
  ]}
/>
```

---

### SearchInput 搜索输入

搜索输入组件。

| 属性          | 类型       | 默认值 | 说明   |
|-------------|----------|-----|------|
| name        | `string` | -   | 字段名称 |
| label       | `string` | -   | 标签   |
| placeholder | `string` | -   | 占位符  |

---

### 工具方法

#### getFilterValue

将筛选值数组转换为参数对象。

```javascript
import { getFilterValue } from '@kne/react-filter';

const filterValue = [
  { name: 'keyword', value: { label: 'test', value: 'test' } },
  { name: 'status', value: [{ label: '已完成', value: 'done' }] }
];

const params = getFilterValue(filterValue);
// { keyword: 'test', status: ['done'] }
```

---

### 筛选值结构

筛选值数组中的每一项结构：

```typescript
interface FilterValueItem {
  name: string;      // 字段名称
  label: string;     // 字段标签（用于展示）
  value: {           // 单个值
    label: string;   // 显示文本
    value: any;      // 实际值
  } | Array<{        // 或多个值
    label: string;
    value: any;
  }> | null;         // 或空值
}
```
