### React Filter

一个功能强大的 React 筛选组件库，支持多种筛选字段类型、灵活的布局方式，以及从 searchParams 种子化筛选初始值的能力。

### 主要特性

- **多种筛选字段类型**：支持输入框、数字区间、日期选择、日期范围、下拉选择等常用筛选类型，以及职能、行业、城市等业务选择器
- **灵活布局**：支持普通筛选（横向布局）和高级筛选（垂直布局）两种模式
- **展开收起**：筛选行支持展开收起功能，优化页面空间利用
- **已选值展示**：自动展示已选筛选条件，支持单独删除和清空全部
- **弹出层交互**：支持弹出层形式的筛选交互，确认后才生效
- **searchParams 种子**：`useSearchParamsValue` 从 URL 平铺参数解析筛选初始值，可选清理已消费 key
- **稳定全局类名**：根 `react-filter`，内部短类名；用 `.react-filter .xxx` / `FILTER_CLASS` 定制
- **数据格式拦截器**：内置 `{id, name}` ↔ `{label, value}` 格式转换拦截器，适配 SuperSelect 场景
- **声明式值映射**：提供 `createFilterValueMapper` 按字段声明转换规则，简化 `getFilterValue` 结果处理
- **国际化支持**：内置中英文语言包，支持多语言切换
- **高阶组件**：提供 `withFilterValue` 和 `withFieldItem` 高阶组件，便于扩展自定义字段

### 适用场景

- 数据列表页面的筛选功能
- 复杂表单的筛选条件配置
- 多条件组合查询场景
- 需要展示已选筛选条件的场景
- 需要从 URL 参数带入初始筛选条件的页面

### 快速开始

```javascript
import Filter, { fields } from '@kne/react-filter';
import '@kne/react-filter/dist/index.css';

const { InputFilterItem, NumberRangeFilterItem, DatePickerFilterItem } = fields;

function MyComponent() {
  const [filterValue, setFilterValue] = useState([]);

  const handleSearch = () => {
    const params = Filter.getFilterValue(filterValue);
    console.log('筛选参数:', params);
  };

  return (
    <Filter
      value={filterValue}
      onChange={setFilterValue}
      list={[
        [
          { type: InputFilterItem, props: { name: 'keyword', label: '关键词' } },
          { type: NumberRangeFilterItem, props: { name: 'amount', label: '金额' } }
        ],
        [
          { type: DatePickerFilterItem, props: { name: 'date', label: '日期' } }
        ]
      ]}
      displayLine={1}
      extra={<Button type="primary" onClick={handleSearch}>搜索</Button>}
    />
  );
}
```

### 核心组件

| 组件 | 说明 |
|------|------|
| `Filter` | 主筛选组件，横向布局，支持展开收起 |
| `AdvancedFilter` | 高级筛选组件，垂直布局 |
| `FilterValueDisplay` | 已选值展示组件 |
| `PopoverItem` | 弹出层筛选项组件 |
| `FilterItem` | 筛选项容器组件 |
| `FilterLines` | 筛选行组件 |
| `FilterProvider` | 状态管理组件 |

### 筛选字段

| 字段组件 | 说明 |
|----------|------|
| `InputFilterItem` | 输入框筛选 |
| `NumberRangeFilterItem` | 数字区间筛选 |
| `DatePickerFilterItem` | 日期选择筛选 |
| `DateRangePickerFilterItem` | 日期范围筛选 |
| `TypeDateRangePickerFilterItem` | 类型日期范围筛选（日/周/月切换） |
| `SuperSelectFilterItem` | 通用选择器筛选（单选/多选/搜索/全选） |
| `SelectTableListFilterItem` | 表格选择器筛选（多列数据展示） |
| `SelectTreeFilterItem` | 树形选择器筛选（层级数据） |
| `SelectCascaderFilterItem` | 级联选择器筛选（父子关联、搜索过滤） |
| `SelectFunctionFilterItem` | 职能筛选（多级数据、拼音搜索） |
| `SelectIndustryFilterItem` | 行业筛选（多级数据、拼音搜索） |
| `SelectAddressFilterItem` | 城市筛选（国内外城市搜索） |

### searchParams 工具

| 工具 | 说明 |
|------|------|
| `useSearchParamsValue` | 从 searchParams 解析筛选初始值数组；可选 strip 已消费 key |


### 其他工具

| 工具 | 说明 |
|------|------|
| `FILTER_CLASS` | 稳定全局类名常量（根 `react-filter` + 内部短类名（无 `filter-` 前缀）），见 api.md |
| `pickSelectValues` | 从筛选值中提取原始值数组 |
| `createFilterValueMapper` | 声明式创建 mapFilterValue 函数 |
| `filterInterceptors` | `{single, multi}` 拦截器集合 |
| `singleSelectInterceptor` | 单选格式转换拦截器 |
| `multiSelectInterceptor` | 多选格式转换拦截器 |
