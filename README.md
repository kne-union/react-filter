
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

console.log(Text.Number);
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
    ]} list={[[<City label="目前城市" name="currentCity" size={5}/>], [<List label="学历" name="degree" size={1}>
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

#### List

| 属性名      | 说明                      | 类型        | 默认值 |
|----------|-------------------------|-----------|-----|
| children | 筛选项的每一项的值，必须为 List.Item | List.Item | -   |

#### List.Item

| 属性名   | 说明     | 类型     | 默认值 |
|-------|--------|--------|-----|
| value | 筛选项的值  | -      | -   |
| label | 筛选项显示项 | string | -   |

其他参数参考对应内部组件的参数

