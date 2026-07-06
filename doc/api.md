### Filter 主组件

筛选组件，用于展示筛选项和处理筛选条件。

#### 属性

| 属性         | 类型                                                 | 默认值   | 说明                           |
| ------------ | ---------------------------------------------------- | -------- | ------------------------------ |
| value        | `Array<{ name: string, label: string, value: any }>` | -        | 筛选值数组                     |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]`     | 默认筛选值                     |
| onChange     | `(value: Array) => void`                             | -        | 筛选值变化回调                 |
| list         | `Array<Array>`                                       | `[]`     | 筛选项配置数组，支持多行       |
| displayLine  | `number`                                             | `1`      | 默认展示的行数，超出部分折叠   |
| label        | `string`                                             | `'筛选'` | 筛选区域标题                   |
| extra        | `ReactNode`                                          | -        | 额外操作区域，通常放置搜索按钮 |
| extraExpand  | `ReactNode`                                          | -        | 已选区域额外内容               |
| className    | `string`                                             | -        | 自定义类名                     |

#### 静态方法

| 方法                                                        | 说明                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| `Filter.getFilterValue(filterValue)`                        | 将筛选值数组转换为参数对象，如 `{ name: value }`                    |
| `Filter.useFilter()`                                        | 获取 Filter Context，返回 `{ value, onChange }`                     |
| `Filter.pickSelectValues(value)`                            | 从筛选值中提取原始值数组，支持 `{ value }`、`{ id }` 格式           |
| `Filter.createFilterValueMapper(fieldMappers)`              | 声明式创建 mapFilterValue 函数，按字段映射转换规则                  |
| `Filter.filterToUrlParams(filterValue, options)`            | 将筛选值数组序列化为 URLSearchParams，保留 label 信息               |
| `Filter.parseFilterEntry(str)`                              | 解析 URL 参数中的单个筛选值项为 `{ label, value }`                  |
| `Filter.takeFilterEntry(searchParams, key, options)`        | 从 URL 参数中读取筛选值项，支持单选/多选                            |
| `Filter.createUrlFilterReader(searchParams)`                | 创建 URL 筛选参数读取器，自动追踪已消费的参数 key                   |
| `Filter.useUrlFilter(options)`                              | 从 URL 参数初始化 Filter 状态的 hook（React Router 环境）           |
| `Filter.useUrlFilterValue(mapping)`                         | useUrlFilter 的简化版，基于 filterParams[key] 格式自动解析 URL 参数 |
| `Filter.createUrlParamsReader(searchParams)`                | 创建通用 URL 参数读取器，自动追踪已消费的参数 key                   |
| `Filter.stripConsumedUrlParams(searchParams, consumedKeys)` | 从 URL 参数中移除已消费的 key，返回新的 URLSearchParams 或 null     |
| `Filter.filterInterceptors.single`                          | 单选拦截器：`{id, name}` ↔ `{label, value}` 数据格式转换            |
| `Filter.filterInterceptors.multi`                           | 多选拦截器：`[{id, name}]` ↔ `[{label, value}]` 数据格式转换        |

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
/>;
```

---

### AdvancedFilter 高级筛选组件

高级筛选组件，用于更复杂的筛选场景，采用垂直布局。

#### 属性

| 属性         | 类型                                                 | 默认值 | 说明             |
| ------------ | ---------------------------------------------------- | ------ | ---------------- |
| value        | `Array<{ name: string, label: string, value: any }>` | -      | 筛选值数组       |
| defaultValue | `Array<{ name: string, label: string, value: any }>` | `[]`   | 默认筛选值       |
| onChange     | `(value: Array) => void`                             | -      | 筛选值变化回调   |
| list         | `Array<Array>`                                       | `[]`   | 筛选项配置数组   |
| more         | `Array`                                              | -      | 额外折叠的筛选项 |
| className    | `string`                                             | -      | 自定义类名       |

#### 使用示例

```javascript
import { AdvancedFilter, fields } from '@kne/react-filter';

<AdvancedFilter value={filterValue} onChange={setFilterValue} list={[[{ type: InputFilterItem, props: { name: 'name', label: '姓名' } }]]} />;
```

---

### FilterValueDisplay 已选值展示

展示已选择的筛选条件，支持单独删除和清空全部。

#### 属性

| 属性        | 类型                                                 | 默认值 | 说明           |
| ----------- | ---------------------------------------------------- | ------ | -------------- |
| value       | `Array<{ name: string, label: string, value: any }>` | -      | 筛选值数组     |
| onChange    | `(value: Array) => void`                             | -      | 筛选值变化回调 |
| extraExpand | `ReactNode`                                          | -      | 额外展示内容   |

---

### PopoverItem 弹出层筛选项

弹出层形式的筛选项，支持确认取消操作。

#### 属性

| 属性             | 类型                                        | 默认值         | 说明               |
| ---------------- | ------------------------------------------- | -------------- | ------------------ |
| label            | `string`                                    | -              | 筛选项标签         |
| value            | `{ label: string, value: any }`             | -              | 当前值             |
| onChange         | `(value: object) => void`                   | -              | 值变化回调         |
| onValidate       | `(value: object) => boolean`                | -              | 确认按钮校验函数   |
| onOpenChange     | `(open: boolean) => void`                   | -              | 弹出层状态变化回调 |
| placement        | `string`                                    | `'bottomLeft'` | 弹出层位置         |
| overlayClassName | `string`                                    | -              | 弹出层自定义类名   |
| children         | `(props: { value, onChange }) => ReactNode` | -              | 内容渲染函数       |

#### 使用示例

```javascript
import { PopoverItem } from '@kne/react-filter';

<PopoverItem label="文本输入" value={inputValue} onChange={setInputValue}>
  {({ value, onChange }) => <Input value={value?.value} onChange={e => onChange({ label: e.target.value, value: e.target.value })} />}
</PopoverItem>;
```

---

### FilterItem 筛选项容器

筛选项的基础容器组件。

#### 属性

| 属性     | 类型        | 默认值 | 说明                 |
| -------- | ----------- | ------ | -------------------- |
| label    | `string`    | -      | 筛选项标签           |
| open     | `boolean`   | -      | 是否展开状态         |
| active   | `boolean`   | -      | 是否激活状态（有值） |
| children | `ReactNode` | -      | 子元素               |

---

### FilterLines 筛选行

筛选行组件，支持多行展开收起。

#### 属性

| 属性        | 类型           | 默认值   | 说明           |
| ----------- | -------------- | -------- | -------------- |
| list                 | `Array`                  | `[]`      | 筛选项配置数组，默认支持单层数组，也兼容双层数组 |
| displayLine          | `number`                 | `1`       | 双层数组模式下默认展示行数 |
| visibleCountStrategy | `'asc' \| 'desc'`        | `'asc'`   | 单层数组模式下可见项计算策略，`asc` 从少往多累加，`desc` 从多往少递减 |
| label                | `string`                 | `'筛选'`  | 标题 |
| extra                | `ReactNode`              | -         | 额外操作区域 |
| className            | `string`                 | -         | 自定义类名 |

---

### FilterProvider 状态管理

Filter 状态管理组件，用于自定义 Filter 结构。

#### 属性

| 属性         | 类型                                  | 默认值 | 说明             |
| ------------ | ------------------------------------- | ------ | ---------------- |
| value        | `Array`                               | -      | 筛选值数组       |
| defaultValue | `Array`                               | `[]`   | 默认筛选值       |
| onChange     | `(value: Array) => void`              | -      | 筛选值变化回调   |
| children     | `ReactNode \| (context) => ReactNode` | -      | 子元素或渲染函数 |

---

### 高阶组件

#### withFilterValue

为组件注入筛选值和变更函数。

```javascript
import { withFilterValue } from '@kne/react-filter';

const MyFilterItem = withFilterValue(({ name, label, value, onChange, ...props }) => {
  return <Component value={value} onChange={onChange} />;
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

| 属性        | 类型                 | 默认值 | 说明         |
| ----------- | -------------------- | ------ | ------------ |
| name        | `string`             | -      | 字段名称     |
| label       | `string`             | -      | 标签         |
| placeholder | `string`             | -      | 占位符       |
| onValidate  | `(value) => boolean` | -      | 确认校验函数 |

#### NumberRangeFilterItem 数字区间筛选

数字区间输入筛选组件。

| 属性        | 类型     | 默认值 | 说明     |
| ----------- | -------- | ------ | -------- |
| name        | `string` | -      | 字段名称 |
| label       | `string` | -      | 标签     |
| unit        | `string` | -      | 单位     |
| min         | `number` | -      | 最小值   |
| max         | `number` | -      | 最大值   |
| placeholder | `string` | -      | 占位符   |

#### DatePickerFilterItem 日期筛选

日期选择筛选组件。

| 属性   | 类型                                                 | 默认值         | 说明       |
| ------ | ---------------------------------------------------- | -------------- | ---------- |
| name   | `string`                                             | -              | 字段名称   |
| label  | `string`                                             | -              | 标签       |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'date'`       | 选择器类型 |
| format | `string`                                             | `'YYYY-MM-DD'` | 日期格式   |

#### DateRangePickerFilterItem 日期范围筛选

日期范围选择筛选组件。

| 属性   | 类型                                | 默认值         | 说明     |
| ------ | ----------------------------------- | -------------- | -------- |
| name   | `string`                            | -              | 字段名称 |
| label  | `string`                            | -              | 标签     |
| format | `string`                            | `'YYYY-MM-DD'` | 日期格式 |
| header | `ReactNode \| (props) => ReactNode` | -              | 头部内容 |

#### TypeDateRangePickerFilterItem 类型日期范围筛选

支持按日/周/月切换的日期范围选择筛选组件。

| 属性   | 类型     | 默认值         | 说明     |
| ------ | -------- | -------------- | -------- |
| name   | `string` | -              | 字段名称 |
| label  | `string` | -              | 标签     |
| format | `string` | `'YYYY-MM-DD'` | 日期格式 |

#### SuperSelectFilterItem 通用选择器筛选

基于 `@kne/super-select` 的通用选择器筛选项，支持单选/多选、搜索、全选等功能。

| 属性             | 类型                      | 默认值  | 说明         |
| ---------------- | ------------------------- | ------- | ------------ |
| name             | `string`                  | -       | 字段名称     |
| label            | `string`                  | -       | 标签         |
| options          | `Array<{ value, label }>` | -       | 选项数据     |
| single           | `boolean`                 | `false` | 是否单选     |
| allowSelectedAll | `boolean`                 | `false` | 是否支持全选 |
| maxLength        | `number`                  | -       | 最多可选数量 |

**使用示例：**

```javascript
import { SuperSelectFilterItem } from '@kne/react-filter';

// 多选
<SuperSelectFilterItem
  label="部门"
  options={[
    { value: 'tech', label: '技术研发部' },
    { value: 'product', label: '产品设计部' }
  ]}
/>

// 单选
<SuperSelectFilterItem
  label="状态"
  single
  options={[
    { value: 'active', label: '启用' },
    { value: 'inactive', label: '停用' }
  ]}
/>
```

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectTableListFilterItem 表格选择器筛选

基于 `@kne/super-select` 的 `SelectTableList` 组件，适用于需要展示多列数据的筛选场景。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 选项数据     |
| columns   | `Array`    | -       | 表格列配置   |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectTreeFilterItem 树形选择器筛选

基于 `@kne/super-select` 的 `SelectTree` 组件，适用于组织架构、分类等层级数据筛选。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 树形数据（含 `parentId`） |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectCascaderFilterItem 级联选择器筛选

基于 `@kne/super-select` 的 `SelectCascader` 组件，支持多列菜单展示、父子关联选择、搜索过滤。

| 属性      | 类型       | 默认值  | 说明         |
| --------- | ---------- | ------- | ------------ |
| name      | `string`   | -       | 字段名称     |
| label     | `string`   | -       | 标签         |
| options   | `Array`    | -       | 级联数据（含 `children`） |
| valueKey  | `string`   | `'id'`  | 值字段名     |
| labelKey  | `string`   | `'name'`| 标签字段名   |
| single    | `boolean`  | `false` | 是否单选     |
| maxLength | `number`   | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select` 依赖。

#### SelectFunctionFilterItem 职能筛选

基于 `@kne/super-select-plus` 的职能选择器筛选项，支持多级职能数据选择、拼音搜索。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### SelectIndustryFilterItem 行业筛选

基于 `@kne/super-select-plus` 的行业选择器筛选项，支持多级行业数据选择、拼音搜索。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### SelectAddressFilterItem 城市筛选

基于 `@kne/super-select-plus` 的城市选择器筛选项，支持国内外城市搜索选择。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| name      | `string`  | -       | 字段名称     |
| label     | `string`  | -       | 标签         |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | -       | 最多可选数量 |

> 注意：需要安装 `@kne/super-select-plus` 依赖。

#### CityFilterItem（高级筛选）

城市选择器的高级筛选版本，用于 `AdvancedFilter` 组件的 `list` 配置中。展示热门城市标签，支持搜索选择其他城市。

| 属性      | 类型      | 默认值  | 说明         |
| --------- | --------- | ------- | ------------ |
| single    | `boolean` | `false` | 是否单选     |
| maxLength | `number`  | `5`     | 最多可选数量 |

**在高级筛选中使用：**

```javascript
import { AdvancedFilter } from '@kne/react-filter';
import { CityFilterItem } from './AdvancedFilter/fields';

<AdvancedFilter list={[[{ type: CityFilterItem, props: { label: '城市', single: true } }]]} />;
```

---

### TypeDateRangePickerField 类型日期范围选择器

支持按日/周/月切换的日期范围选择器基础组件。

| 属性            | 类型                                                       | 默认值                          | 说明             |
| --------------- | ---------------------------------------------------------- | ------------------------------- | ---------------- |
| value           | `{ type: string, value: [Date, Date] }`                    | -                               | 当前值           |
| defaultValue    | `{ type: string, value: [Date, Date] }`                    | `{ type: 'date', value: null }` | 默认值           |
| onChange        | `(value: object) => void`                                  | -                               | 值变化回调       |
| shortcuts       | `boolean`                                                  | `true`                          | 是否显示快捷选项 |
| shortcutOptions | `Array<{ label: string, getValue: () => [Dayjs, Dayjs] }>` | -                               | 自定义快捷选项   |

**value 结构：**

```typescript
interface TypeDateRangeValue {
  type: 'date' | 'week' | 'month'; // 日期类型
  value: [Date, Date] | null; // 日期范围 [开始时间, 结束时间]
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
/>;
```

---

### SearchInput 搜索输入

搜索输入组件，适合放在列表顶部做关键词搜索。输入过程中维护本地输入值，停止输入 500ms 后自动提交筛选值；中文等输入法组合输入期间不会触发搜索，确认文本后才开始计时。按回车或点击搜索按钮会立即提交。清空后搜索会提交 `null`，用于移除该筛选条件。

| 属性        | 类型                               | 默认值 | 说明                                 |
| ----------- | ---------------------------------- | ------ | ------------------------------------ |
| name        | `string`                           | -      | 字段名称，用于写入筛选值             |
| label       | `string`                           | -      | 标签，用于展示已选筛选条件           |
| value       | `{ label: string, value: string }` | -      | 当前搜索值                           |
| onChange    | `(value: object \| null) => void`  | -      | 搜索提交回调，清空搜索时返回 `null`  |
| placeholder | `string`                           | -      | 占位符                               |
| searchDelay | `number`                           | `500`  | 自动提交搜索的防抖等待时间，单位毫秒 |

#### 使用示例

```javascript
import { SearchInput, FilterProvider, getFilterValue } from '@kne/react-filter';

const [filterValue, setFilterValue] = useState([]);

<FilterProvider value={filterValue} onChange={setFilterValue}>
  <SearchInput name="keyword" label="关键词" placeholder="请输入关键词" searchDelay={500} allowClear />
</FilterProvider>;

const params = getFilterValue(filterValue);
// { keyword: 'React' }
```

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
  name: string; // 字段名称
  label: string; // 字段标签（用于展示）
  value:
    | {
        // 单个值
        label: string; // 显示文本
        value: any; // 实际值
      }
    | Array<{
        // 或多个值
        label: string;
        value: any;
      }>
    | null; // 或空值
}
```

---

### URL 参数相关

#### filterToUrlParams

将筛选值数组序列化为 URLSearchParams，保留 label 信息以便反序列化还原完整筛选状态。

| 参数           | 类型     | 默认值           | 说明                                 |
| -------------- | -------- | ---------------- | ------------------------------------ |
| filterValue    | `Array`  | -                | 筛选值数组                           |
| options.prefix | `string` | `'filterParams'` | URL 参数前缀，设为空字符串则不加前缀 |

**序列化格式**：

- 单值且 `label === value`：`prefix[name]=value`（如输入框）
- 单值且 `label !== value`：`prefix[name]=label:value`
- 多值：`prefix[name]=label1:value1,label2:value2`

**使用示例：**

```javascript
import { filterToUrlParams } from '@kne/react-filter';

const params = filterToUrlParams([
  { name: 'keyword', label: '关键词', value: { label: '测试', value: '测试' } },
  {
    name: 'city',
    label: '城市',
    value: [
      { label: '上海', value: '010' },
      { label: '北京', value: '020' }
    ]
  }
]);
// params.toString() => 'filterParams[keyword]=测试&filterParams[city]=上海:010,北京:020'

// 自定义前缀
filterToUrlParams(filterValue, { prefix: 'f' });
// => 'f[keyword]=测试'

// 无前缀（直接平铺到 URL）
filterToUrlParams(filterValue, { prefix: '' });
// => 'keyword=测试'
```

---

#### parseFilterEntry

解析 URL 参数中的单个筛选值项，反序列化为 `{ label, value }` 对象。

| 参数 | 类型     | 说明                   |
| ---- | -------- | ---------------------- |
| str  | `string` | URL 参数中的原始字符串 |

**解析规则**：

- 无冒号：label 和 value 相同，如 `"测试"` → `{ label: '测试', value: '测试' }`
- 有冒号：冒号前为 label，冒号后为 value，如 `"启用:active"` → `{ label: '启用', value: 'active' }`

```javascript
import { parseFilterEntry } from '@kne/react-filter';

parseFilterEntry('测试');
// => { label: '测试', value: '测试' }

parseFilterEntry('启用:active');
// => { label: '启用', value: 'active' }
```

---

#### takeFilterEntry

从 URL 参数中读取筛选值项，返回单选 `{ label, value }` 或多选数组。

| 参数           | 类型              | 默认值           | 说明               |
| -------------- | ----------------- | ---------------- | ------------------ |
| searchParams   | `URLSearchParams` | -                | URL 参数对象       |
| key            | `string`          | -                | 参数名（不含前缀） |
| options.multi  | `boolean`         | `false`          | 是否多选           |
| options.prefix | `string`          | `'filterParams'` | URL 参数前缀       |

```javascript
import { takeFilterEntry } from '@kne/react-filter';

// URL: ?filterParams[city]=上海:010,北京:020
takeFilterEntry(searchParams, 'city', { multi: true });
// => [{ label: '上海', value: '010' }, { label: '北京', value: '020' }]

takeFilterEntry(searchParams, 'keyword', { prefix: '' });
// => { label: '测试', value: '测试' }
```

---

#### createUrlFilterReader

创建 URL 筛选参数读取器，自动追踪已消费的参数 key。配合 `useUrlFilter` 使用，readUrlParams 返回的 consumedKeys 可被自动清除。

| 参数           | 类型              | 默认值           | 说明         |
| -------------- | ----------------- | ---------------- | ------------ |
| searchParams   | `URLSearchParams` | -                | URL 参数对象 |
| options.prefix | `string`          | `'filterParams'` | URL 参数前缀 |

**返回值**：`{ takeFilterEntry, getConsumedKeys }`

```javascript
import { createUrlFilterReader } from '@kne/react-filter';

const { takeFilterEntry, getConsumedKeys } = createUrlFilterReader(searchParams);
const keyword = takeFilterEntry('keyword');
const city = takeFilterEntry('city', { multi: true });
// getConsumedKeys() => ['filterParams[keyword]', 'filterParams[city]']
```

---

#### useUrlFilter

从 URL 参数初始化 Filter 状态的 hook，读取 URL 参数构建初始筛选值，并在挂载后自动清除已消费的 URL 参数。

> 需要 React Router 环境支持 `useSearchParams`。

| 参数                  | 类型       | 说明                                                      |
| --------------------- | ---------- | --------------------------------------------------------- |
| options.readUrlParams | `Function` | 读取 URL 参数并返回 `{ consumedKeys: string[], ...data }` |
| options.buildFilter   | `Function` | 接收 readUrlParams 的返回值，构建初始 filter 数组         |

**返回值**：`[filter, setFilter]`

```javascript
import { useUrlFilter, createUrlParamsReader } from '@kne/react-filter';

const [filter, setFilter] = useUrlFilter({
  readUrlParams: searchParams => {
    const { take, getConsumedKeys } = createUrlParamsReader(searchParams);
    const orgId = take('tenantOrgId');
    return { consumedKeys: getConsumedKeys(), orgId };
  },
  buildFilter: ({ orgId }) => [{ name: 'status', value: { label: '开启', value: 'open' } }, ...(orgId ? [{ name: 'tenantOrgId', value: { label: orgId, value: orgId } }] : [])]
});
```

---

#### useUrlFilterValue

`useUrlFilter` 的简化版，基于 `filterParams[key]` 格式自动解析 URL 参数，支持单选和多选。

| 参数    | 类型                 | 说明                                 |
| ------- | -------------------- | ------------------------------------ |
| mapping | `string[] \| Object` | URL 参数映射，支持数组、对象两种格式 |

**数组形式（默认单选）：**

```javascript
import { useUrlFilterValue } from '@kne/react-filter';

const [filter, setFilter] = useUrlFilterValue(['keyword', 'status']);
// URL: ?filterParams[keyword]=前端开发&filterParams[status]=招聘中:active
// → filter: [
//     { name: 'keyword', value: { label: '前端开发', value: '前端开发' } },
//     { name: 'status', value: { label: '招聘中', value: 'active' } }
//   ]
```

**对象形式（多选 + 自定义）：**

```javascript
const [filter, setFilter] = useUrlFilterValue({
  keyword: true, // 单选
  city: { multi: true }, // 多选
  status: parsed => {
    // 自定义转换
    return parsed ? { name: 'status', value: parsed } : null;
  }
});
// URL: ?filterParams[keyword]=测试&filterParams[city]=上海:010,北京:020
```

---

#### createUrlParamsReader

创建通用 URL 参数读取器，自动追踪已消费的参数 key。

| 参数         | 类型              | 说明         |
| ------------ | ----------------- | ------------ |
| searchParams | `URLSearchParams` | URL 参数对象 |

**返回值**：`{ take, getConsumedKeys }`

- `take(key)` - 读取参数值，记录已消费
- `getConsumedKeys()` - 返回已消费的 key 列表

```javascript
import { createUrlParamsReader } from '@kne/react-filter';

const { take, getConsumedKeys } = createUrlParamsReader(searchParams);
const orgId = take('tenantOrgId');
const orgName = take('orgName');
// getConsumedKeys() => ['tenantOrgId', 'orgName']
```

---

#### stripConsumedUrlParams

从 URL 参数中移除已消费的 key，返回新的 URLSearchParams 或 null（无变化时）。

| 参数         | 类型              | 说明                |
| ------------ | ----------------- | ------------------- |
| searchParams | `URLSearchParams` | 当前 URL 参数       |
| consumedKeys | `string[]`        | 需要移除的 key 列表 |

**返回值**：`URLSearchParams | null`

```javascript
import { stripConsumedUrlParams } from '@kne/react-filter';

const nextParams = stripConsumedUrlParams(searchParams, ['tenantOrgId', 'orgName']);
if (nextParams) {
  setSearchParams(nextParams, { replace: true });
}
```

---

### 拦截器

用于 SuperSelect 组件的 `{id, name}` 与 Filter 的 `{label, value}` 数据格式互转。

#### singleSelectInterceptor

单选拦截器：`{id, name}` ↔ `{label, value}`。

| 属性   | 类型       | 说明                                   |
| ------ | ---------- | -------------------------------------- |
| input  | `Function` | `{id, name}` → `{label, value}` 的转换 |
| output | `Function` | `{label, value}` → `{id, name}` 的转换 |

#### multiSelectInterceptor

多选拦截器：`[{id, name}]` ↔ `[{label, value}]`。

| 属性   | 类型       | 说明                                       |
| ------ | ---------- | ------------------------------------------ |
| input  | `Function` | `[{id, name}]` → `[{label, value}]` 的转换 |
| output | `Function` | `[{label, value}]` → `[{id, name}]` 的转换 |

#### filterInterceptors

拦截器集合对象。

```javascript
import { filterInterceptors, singleSelectInterceptor, multiSelectInterceptor } from '@kne/react-filter';

// 两种引用方式等价
filterInterceptors.single === singleSelectInterceptor; // true
filterInterceptors.multi === multiSelectInterceptor; // true
```

**使用示例：**

```javascript
import { filterInterceptors } from '@kne/react-filter';

// 在 SuperSelect 组件中使用单选拦截
<SuperSelect
  valueKey="id"
  labelKey="name"
  interceptor={filterInterceptors.single}
  /* ... */
/>

// 多选拦截
<SuperSelect
  valueKey="id"
  labelKey="name"
  interceptor={filterInterceptors.multi}
  /* ... */
/>
```

---

### 工具方法

#### pickSelectValues

从筛选值中提取原始值数组。支持原始值、`{ value }` 对象、`{ id }` 对象以及它们的数组。

| 参数  | 类型  | 说明                 |
| ----- | ----- | -------------------- |
| value | `any` | 筛选值，支持多种格式 |

```javascript
import { pickSelectValues } from '@kne/react-filter';

pickSelectValues([{ value: 1 }, { id: 2 }, '3']);
// => ['1', '2', '3']

pickSelectValues({ value: 'open' });
// => ['open']

pickSelectValues(null);
// => []
```

#### createFilterValueMapper

声明式创建 mapFilterValue 函数。`Filter.getFilterValue` 默认只读取 `{ value }`，而 SuperSelectFilterItem 等组件使用 `{ id, name }` 格式，需要额外处理。此工具通过声明字段映射规则，自动生成转换函数。

| 参数         | 类型     | 说明                   |
| ------------ | -------- | ---------------------- |
| fieldMappers | `Object` | 字段名到映射规则的映射 |

**映射规则类型：**

| 规则       | 说明                                                    |
| ---------- | ------------------------------------------------------- |
| `'string'` | 确保值为字符串类型                                      |
| `'multi'`  | 多选，从 filter entry 提取值数组                        |
| `'single'` | 单选，从 filter entry 提取第一个值                      |
| `Function` | 自定义转换，接收 `(rawValue, { entry, filter, value })` |

```javascript
import { createFilterValueMapper } from '@kne/react-filter';

const mapFilterValue = createFilterValueMapper({
  id: 'string',
  roles: 'multi',
  tenantOrgId: 'single',
  status: rawValue => normalizeStatus(rawValue)
});

const filterValue = mapFilterValue(filter, Filter.getFilterValue);
```
