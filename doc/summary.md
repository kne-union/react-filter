### React Filter

一个功能强大的 React 筛选组件库，支持多种筛选字段类型和灵活的布局方式。

### 主要特性

- **多种筛选字段类型**：支持输入框、数字区间、日期选择、日期范围等常用筛选类型
- **灵活布局**：支持普通筛选（横向布局）和高级筛选（垂直布局）两种模式
- **展开收起**：筛选行支持展开收起功能，优化页面空间利用
- **已选值展示**：自动展示已选筛选条件，支持单独删除和清空全部
- **弹出层交互**：支持弹出层形式的筛选交互，确认后才生效
- **国际化支持**：内置中英文语言包，支持多语言切换
- **高阶组件**：提供 `withFilterValue` 和 `withFieldItem` 高阶组件，便于扩展自定义字段

### 适用场景

- 数据列表页面的筛选功能
- 复杂表单的筛选条件配置
- 多条件组合查询场景
- 需要展示已选筛选条件的场景

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

### 依赖

- React >= 16.8
- antd >= 5.0.0
- dayjs
- lodash
