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
| className    | `string`                                             | -        | 挂到根容器的自定义类名；内部节点见「稳定全局类名」 |

#### 静态方法

| 方法                                                        | 说明                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| `Filter.getFilterValue(filterValue)`                        | 将筛选值数组转换为参数对象，如 `{ name: value }`                    |
| `Filter.useFilter()`                                        | 获取 Filter Context，返回 `{ value, onChange }`                     |
| `Filter.pickSelectValues(value)`                            | 从筛选值中提取原始值数组，支持 `{ value }`、`{ id }` 格式           |
| `Filter.createFilterValueMapper(fieldMappers)`              | 声明式创建 mapFilterValue 函数，按字段映射转换规则                  |
| `Filter.useSearchParamsValue(options)`                      | 从 searchParams 解析筛选初始值数组；可选 strip 已消费 URL key       |
| `Filter.filterInterceptors.single`                          | 单选拦截器：`{id, name}` ↔ `{label, value}` 数据格式转换            |
| `Filter.filterInterceptors.multi`                           | 多选拦截器：`[{id, name}]` ↔ `[{label, value}]` 数据格式转换        |
| `Filter.FILTER_CLASS`                                       | 稳定全局类名常量对象，见下方「稳定全局类名」                         |

#### 稳定全局类名

根节点挂 `react-filter`；内部节点挂短类名（与 CSS Modules 默认样式并行）。调用方用 **`.react-filter .xxx`** 限定作用域定制；`className` 仍只挂根。命名可通过 `FILTER_CLASS` / `Filter.FILTER_CLASS` 引用。

| 常量键 | 类名 | 节点 |
|--------|------|------|
| `root` | `react-filter` | 根容器 |
| `isMobile` | `is-mobile` | 移动端根修饰 |
| `title` | `title` | 筛选项标题行 |
| `label` | `label` | 行标题文案（筛选 / 已选 / 更多） |
| `list` | `list` | 筛选项列表区 |
| `listScrollWrap` | `list-scroll-wrap` | 列表滚动外层 |
| `listScroll` | `list-scroll` | 列表滚动容器 |
| `line` | `line` | 筛选项行 |
| `extra` | `extra` | 行右侧 extra |
| `more` | `more` | 「更多」按钮 |
| `moreRow` | `more-row` | 展开后的更多行 |
| `children` | `children` | FilterLines children 行 |
| `itemWrap` | `item-wrap` | 筛选项外层 |
| `item` | `item` | 筛选项 |
| `itemActive` | `is-active` | 筛选项激活（挂在 item 上） |
| `itemVisited` | `is-visited` | 筛选项打开中（挂在 item 上） |
| `itemLabel` | `item-label` | 筛选项标签 |
| `itemIcon` | `item-icon` | 筛选项箭头 |
| `itemField` | `item-field` | 筛选项字段区 |
| `valueDisplay` | `value-display` | 已选值展示根 |
| `valueTag` | `value-tag` | 已选 Tag |
| `valueTagLabel` | `value-tag-label` | Tag 字段名 |
| `valueTagContent` | `value-tag-content` | Tag 值文案 |
| `valueActions` | `value-actions` | 已选操作区 |
| `valueClear` | `value-clear` | 清空按钮 |
| `valueToggle` | `value-toggle` | 展开/收起按钮 |
| `advanced` | `advanced` | AdvancedFilter 内容区 |

**迁移：** 根由裸 `filter` 改为 `react-filter`；内部类名去掉 `filter-` / `react-filter-` 前缀（如原 `filter-title` → `title`，在 `.react-filter` 下使用）。

```css
.react-filter .title { padding: 12px 0; }
.react-filter .item.is-active { color: var(--primary-color); }
.react-filter .value-tag { border-radius: 4px; }
```

```javascript
import { FILTER_CLASS } from '@kne/react-filter';
// `.${FILTER_CLASS.root} .${FILTER_CLASS.item}`
```

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

### searchParams 相关

#### useSearchParamsValue

从 `searchParams` 同步解析筛选初始值数组。不管理 Filter 的 `value` / `defaultValue` / `onChange`，由调用方自行 seed。若传入 `setSearchParams`（function），mount 后会以 `replace: true` 清除已消费的 URL key。

**函数签名：**
```javascript
useSearchParamsValue(options): array
```

**参数：**

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| options.searchParams | URL 查询参数 | URLSearchParams | 是 |
| options.setSearchParams | 清理已消费 key；非 function 则只读 | function | 否 |
| options.fields | `[{ name, label }]`，`name` 为 URL key 与筛选 name | array | 是 |

**返回值：** `searchParamsValue` 筛选值数组（可能为 `[]`）。每项形如 `{ name, label, value: { label: raw, value: raw } }`。

**示例：**
```javascript
import { useSearchParamsValue } from '@kne/react-filter';
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();
const searchParamsValue = useSearchParamsValue({
  searchParams,
  setSearchParams,
  fields: [
    { name: 'userId', label: '用户Id' },
    { name: 'tenantId', label: '租户Id' }
  ]
});
const [filter, setFilter] = useState(searchParamsValue);
// 或 <Filter defaultValue={searchParamsValue} ... />
```


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
