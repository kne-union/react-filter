
# react-filter


### 描述

筛选器


### 安装

```shell
npm i --save @kne/react-filter
```


### 概述

用户列表数据的筛选

* 默认提供了常见的几种筛选项

* 支持自定义筛选项类型扩展


### 示例(全屏)

#### 示例代码

- 基础示例
- 展示一个筛选器的普通模式
- reactFilter(@kne/react-filter),(@kne/react-filter/dist/index.css),message(antd/lib/message),_(lodash)

```jsx
const {useState} = React;
const {default: Filter, createExtraButton} = reactFilter;
const {default: antdMessage} = message;

const {City, List, Range, Text, Selector, Check, DateTime} = Filter.type;

const {isNumber} = _;

const BaseExample = () => {
    const [value, setValue] = useState({});
    console.log(value);
    return <Filter value={value} onChange={(value) => {
        setValue(value);
    }} more={[
        <Text label="测试字段" name="test1"/>,
        <Text label="测试字段2" name="test2" onBeforeSearch={(value) => {
            antdMessage.error(`提交被拦截，输入值${value}`);
            return false;
        }}/>,
        <Text.Number label="测试字段7" name="test7"/>,
        <Range label="测试字段3" name="test3"/>,
        <Selector label="测试字段4" name="test4"
                  options={[{
                      label: "英语", value: "en"
                  }, {
                      label: "日语", value: "jap"
                  }, {
                      label: "法语", value: "fac"
                  }]}/>,
        <DateTime label="测试字段5" name="test5" showTime/>,
        <DateTime.Range label="测试字段6" name="test6"/>
    ]} list={[[<City label="目前城市" name="currentCity" size={5}/>], [<List label="学历" name="degree" size={2}>
        <List.Item value="0" label="初中"/>
        <List.Item value="1" label="高中"/>
        <List.Item value="2" label="大学专科"/>
        <List.Item value="3" label="大学本科"/>
    </List>], [<List label="求职意向" name="yixiang" size={1}
                     options={[{label: "暂时不找工作", value: 0}, {label: "在职看机会", value: 1}, {
                         label: "离职正在找工作", value: 2
                     }]}/>], [<Range label="年龄" name="age" template={(value) => {
        if (!value || value.length === 0) {
            return "";
        }
        if (!isNumber(value[0]) && isNumber(value[1])) {
            return `${value[1]}岁以下`;
        }
        if (!isNumber(value[1]) && isNumber(value[0])) {
            return `${value[0]}岁以上`;
        }
        return `${value[0]}-${value[1]}岁`;
    }}/>, <Text label="行业" name="inter"/>, <Selector label="语言" name="lang"
                                                     options={[{
                                                         label: "英语", value: "en"
                                                     }, {
                                                         label: "日语", value: "jap"
                                                     }, {
                                                         label: "法语", value: "fac"
                                                     }]}/>], [<List size={1}
                                                                    label="薪资范围"
                                                                    name="sarl"
                                                                    options={[{
                                                                        label: "10k以下", value: [null, 10]
                                                                    }, {
                                                                        label: "10k-20k", value: [10, 20]
                                                                    }, {
                                                                        label: "20k以上", value: [20, null]
                                                                    }]}
                                                                    more={createExtraButton({
                                                                        type: "range", template: (value) => {
                                                                            if (!value || value.length === 0) {
                                                                                return "";
                                                                            }
                                                                            if (!isNumber(value[0]) && isNumber(value[1])) {
                                                                                return `${value[1]}k以下`;
                                                                            }
                                                                            if (!isNumber(value[1]) && isNumber(value[0])) {
                                                                                return `${value[0]}k以上`;
                                                                            }
                                                                            return `${value[0]}k-${value[1]}k`;
                                                                        }
                                                                    })}/>, <Check label="海外经历" name="out"/>]]}/>;
};

render(<BaseExample/>);

```

- 简单示例
- 展示一个简单的筛选项，一般放在列表页title extra位置
- reactFilter(@kne/react-filter),(@kne/react-filter/dist/index.css),space(antd/lib/space)

```jsx
const {useState} = React;
const {default: Filter} = reactFilter;
const {default: Space} = space;

const {RadioList, Selector, Text, CheckboxList} = Filter.type;

const Example = () => {
    const [value, setValue] = useState([]);
    const [radioValue, setRadioValue] = useState({});
    const [checkboxValue, setCheckboxValue] = useState({});
    console.log(value, radioValue, checkboxValue);
    return <Space direction="vertical">
        <Filter value={value} onChange={setValue} labelHidden itemLabelHidden list={[[
            <Text name="positionName" label="职位名称"/>,
            <Selector name="type" options={[
                {
                    label: '全职',
                    value: 1
                }, {
                    label: '兼职',
                    value: 2
                }
            ]} label="职位类型"/>
        ]]}/>
        <Filter value={radioValue} onChange={setRadioValue} labelHidden list={[[
            <RadioList name="state" label="客户状态" options={[
                {
                    label: "全部状态",
                    value: 0
                }, {
                    label: "待开发",
                    value: 1
                }, {
                    label: "开发中",
                    value: 2
                }, {
                    label: "已签约",
                    value: 3
                }, {
                    label: "已终止",
                    value: 4
                }
            ]}/>
        ]]}/>
        <Filter value={checkboxValue} onChange={setCheckboxValue} labelHidden list={[[
            <CheckboxList name="state" label="客户状态" options={[
                {
                    label: "全部状态",
                    value: 0
                }, {
                    label: "待开发",
                    value: 1
                }, {
                    label: "开发中",
                    value: 2
                }, {
                    label: "已签约",
                    value: 3
                }, {
                    label: "已终止",
                    value: 4
                }
            ]}/>
        ]]}/>
    </Space>
};

render(<Example/>);

```

- 扩展示例
- 展示扩展筛选项，自定义筛选项
- reactFilter(@kne/react-filter),modal(antd/lib/modal),input(antd/lib/input),space(antd/lib/space),datePicker(antd/lib/date-picker),monment(moment),_(lodash),(@kne/react-filter/dist/index.css)

```jsx
const {default: ReactFilter, useFilterContext, FilterItem, withFilterItem, SearchButton} = reactFilter;
const {default: Modal} = modal;
const {default: Input} = input;
const {default: Space} = space;
const {default: DatePicker} = datePicker;
const {useRef, useState} = React;
const {get} = _;

const MyFilter = (props) => {
    const ref = useRef();
    const {value, onChange} = useFilterContext();
    return <FilterItem {...props} onClick={() => {
        Modal.confirm({
            icon: null,
            content: <Input ref={ref} defaultValue={get(value[props.name], 'value')}/>,
            onOk: () => {
                const value = ref.current.input.value;
                onChange(props.name, {
                    label: value,
                    value
                });
            }
        });
        console.log(value);
    }}/>;
};

const DateRange = withFilterItem(({
                                      name,
                                      size,
                                      isMore,
                                      defaultActive,
                                      onBlur,
                                      onSearch,
                                      onBeforeSearch,
                                      startProps,
                                      endProps,
                                      placeholder
                                  }) => {
    const ref = useRef();

    const sort = (a, b) => {
        if (a && b) {
            return new Date(a) - new Date(b);
        }
        return 0;
    };

    return <SearchButton size={size} template={(value) => {
        if (!value[0] && value[1]) {
            return `${value[1]}之前`;
        }
        if (!value[1] && value[0]) {
            return `${value[0]}之后`;
        }
        return value.join('~');
    }} isMore={isMore} onBlur={onBlur} defaultActive={defaultActive}
                         name={name}
                         onSearch={onSearch}
                         onBeforeSearch={onBeforeSearch}>
        {({value, setValue, setActive}) => {
            return <div ref={ref}>
                <Space>
                    <DatePicker size="small" {...startProps} getPopupContainer={() => ref.current}
                                value={get(value, 0) && monment(get(value, 0))}
                                onChange={(inputValue) => {
                                    const target = [inputValue && inputValue.format('YYYY-MM-DD HH:mm:ss'), get(value, 1)];
                                    setValue(target.sort(sort));
                                }} onFocus={() => {
                        setActive(true);
                    }} placeholder={Array.isArray(placeholder) ? placeholder[0] : (placeholder || "请输入")}/>
                    ~
                    <DatePicker size="small" {...endProps} getPopupContainer={() => ref.current}
                                value={get(value, 1) && monment(get(value, 1))}
                                onChange={(inputValue) => {
                                    const target = [get(value, 0), inputValue && inputValue.format('YYYY-MM-DD HH:mm:ss')];
                                    setValue(target.sort(sort));
                                }} onFocus={() => {
                        setActive(true);
                    }} placeholder={Array.isArray(placeholder) ? placeholder[0] : (placeholder || "请输入")}/>
                </Space>
            </div>
        }}
    </SearchButton>
});

const Example = () => {
    const [value, setValue] = useState({});
    return <ReactFilter value={value} onChange={setValue} moreTrigger="click"
                        more={[<MyFilter name="test1" label="测试"/>, <DateRange name="test2" label="测试2"/>]}/>
};

render(<Example/>);

```


### API

| 属性名             | 说明                                                                           | 类型       | 默认值   |
|-----------------|------------------------------------------------------------------------------|----------|-------|
| value           | 筛选器的值，该组件为一个受控组件                                                             | object   | -     |
| onChange        | 筛选器的值发生改变的时候调用的函数                                                            | function | -     |
| list            | 筛选器的选项，为一个二维数组，二维数组中的每一个数组为一行，内部数组的每一项为一个筛选选项，筛选选项为Filter.type中的一项或者是自行扩展的选项 | array    | []    |
| more            | 筛选项更多选项，为一个一维数组，数组中的每一项为一个筛选项，和list不同的是该筛选项默认为收起状态                           | array    | []    |
| moreLabel       | 更多选项的label                                                                   | string   | 更多    |
| moreTrigger     | 更多选项的触发方式，默认为hover触发，页可以设置为click                                             | string   | hover |
| label           | 筛选器的label                                                                    | string   |筛选项|
| labelHidden     | 筛选器的label及筛选内容行是否隐藏                                                          | boolean  | false    |
| itemLabelHidden | 筛选项的label是否隐藏                                                                | boolean  |false|
| unfoldText      | 展开提示文字                                                                       |string| 展开       |
| foldText        | 收起提示文字                                                                       |string|收起|
|displayLine| 默认展开行数                                                                       |number|2|
|defaultDisplay| 默认是否展开                                                                       |boolean|false|
|isExtra| 是否将list切分成收起项和默认展开项                                                          |boolean|true|
|extra| 额外内容                                                                         |boolean|null|

#### Filter.type

City(城市选择), List(列表选择，可以多选或者单选), Range(数据范围), Text(文字输入) Text.Number, Selector(下拉选项), Check(单项选择), RadioList(单选列表),
CheckboxList（多选列表）

DateTime(时间选择),DateTime.Time DateTime.Range DateTime.Week DateTime.Month DateTime.Year

公共参数

| 属性名   | 说明                                         | 类型     | 默认值 |
|-------|--------------------------------------------|--------|-----|
| label | 筛选项名称                                      | string | -   |
| name  | 筛选项的key                                    | string | -   |
| placeholder| 筛选项的placeholder(如果可以显示的话)，如果不传值通常会去label的值 | string |-|

#### Text|Text.Number|Range

| 属性名   | 说明                                                    | 类型     | 默认值 |
|-------|-------------------------------------------------------|--------|-----|
|onBeforeSearch| 带有确定按钮的筛选项，在点击确定后会调用该方法，如果该方法返回为false，则该选项的值不会被提交给筛选项 | function | -   |

##### Range|DateTime.Range

| 属性名   | 说明                                                           | 类型       | 默认值 |
|-------|--------------------------------------------------------------|----------|-----|
|   template    | 将一组数据范围显示成一段用户可阅读的问题的模版，参数为筛选项的值,要求返回一个描述的字符串                | function | -   |
|placeholder| 当为字符串时前后两个输入框显示同样内容，当为一个数组时，第一个输入框显示数组的第一个值，第二个输入框显示为数组的第二个值 | string&#124;array                                | -        |

#### Range

| 属性名   | 说明                       | 类型     | 默认值 |
|-------|--------------------------|--------|-----|
|startProps| 该参数会结构以后传给第一个InputNumber | object |-|
|endProps| 该参数会结构以后传给第二个InputNumber | object |-|

#### List

| 属性名      | 说明                                                                           | 类型                      | 默认值 |
|----------|------------------------------------------------------------------------------|-------------------------|-----|
| children | 筛选项的每一项的值，必须为 List.Item，也可以为一个render function可以接收到参数render({value,onChange}) | List.Item&#124;function | -   |
| size     | 最大可以选中数量，等于1的时候为单选，操作逻辑和多选略有不同                                               | number                  |2|
| options| 筛选项，为一个数组，每一项的值为{label,value}该属性有值优先取该值忽略children                            | array                   |-|

#### List.Item

| 属性名   | 说明     | 类型     | 默认值 |
|-------|--------|--------|-----|
| value | 筛选项的值  | -      | -   |
| label | 筛选项显示项 | string | -   |

#### SearchButton

用于自行封装过滤选项时的工具组件。Text,Text.Number，Range使用该组件实现。该组件可以让筛选项有一个包裹层在鼠标经过时显示，同时有一个确定按钮，在确定按钮点击时筛选项的结果会提交到Filter。

| 属性名   | 说明                                                                        | 类型      | 默认值   |
|-------|---------------------------------------------------------------------------|---------|-------|
| defaultActive | 默认是否激活活跃状态                                                                | boolean | false |
|defaultValue| 默认值通常不需要传，会取筛选器的对应项的值                                                     |-|-|
|buttonText| 确认按钮的文案                                                                   | string  | 确定    |
|template| 格式化结果函数                                                                   |function|-|
|children| 是一个函数，需要传一个render函数返回内层的输入组件，会接收到children({value, setValue, setActive})参数 |function|-|
|onBlur| 会模拟一个失去焦点的事件，点击该组件区域外的地方会触发并执行该函数                                         |function|-|
|onSearch| 点击确认按钮时触发函数                                                               |function|-|
|onBeforeSearch| 点击确认按钮会先触发该函数如果该函数显示返回false值则不会再触发onSearch函数，用于再筛选项的值提交给筛选器之前的数据验证|function|-|
|onActiveChange|激活状态改变时触发函数|function|-|

其他参数参考对应内部组件的参数

