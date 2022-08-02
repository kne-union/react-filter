import * as component_203 from '@kne/react-filter';
import '@kne/react-filter/dist/index.css';
import * as component_205 from 'antd/lib/message';
import * as component_206 from 'lodash';
import '@kne/react-filter/dist/index.css';
import * as component_208 from 'antd/lib/space';
const readmeConfig = {
    name: `@kne/react-filter`,
    description: `筛选器`,
    summary: `<p>用户列表数据的筛选</p>
<ul>
<li>
<p>默认提供了常见的几种筛选项</p>
</li>
<li>
<p>支持自定义筛选项类型扩展</p>
</li>
</ul>`,
    api: `<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>筛选器的值，该组件为一个受控组件</td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>onChange</td>
<td>筛选器的值发生改变的时候调用的函数</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>list</td>
<td>筛选器的选项，为一个二维数组，二维数组中的每一个数组为一行，内部数组的每一项为一个筛选选项，筛选选项为Filter.type中的一项或者是自行扩展的选项</td>
<td>array</td>
<td>[]</td>
</tr>
<tr>
<td>more</td>
<td>筛选项更多选项，为一个一维数组，数组中的每一项为一个筛选项，和list不同的是该筛选项默认为收起状态</td>
<td>array</td>
<td>[]</td>
</tr>
<tr>
<td>moreLabel</td>
<td>更多选项的label</td>
<td>string</td>
<td>更多</td>
</tr>
<tr>
<td>moreTrigger</td>
<td>更多选项的触发方式，默认为hover触发，页可以设置为click</td>
<td>string</td>
<td>hover</td>
</tr>
<tr>
<td>label</td>
<td>筛选器的label</td>
<td>string</td>
<td>筛选项</td>
</tr>
<tr>
<td>labelHidden</td>
<td>筛选器的label及筛选内容行是否隐藏</td>
<td>boolean</td>
<td>false</td>
</tr>
<tr>
<td>itemLabelHidden</td>
<td>筛选项的label是否隐藏</td>
<td>boolean</td>
<td>false</td>
</tr>
<tr>
<td>unfoldText</td>
<td>展开提示文字</td>
<td>string</td>
<td>展开</td>
</tr>
<tr>
<td>foldText</td>
<td>收起提示文字</td>
<td>string</td>
<td>收起</td>
</tr>
<tr>
<td>displayLine</td>
<td>默认展开行数</td>
<td>number</td>
<td>2</td>
</tr>
<tr>
<td>defaultDisplay</td>
<td>默认是否展开</td>
<td>boolean</td>
<td>false</td>
</tr>
<tr>
<td>isExtra</td>
<td>是否将list切分成收起项和默认展开项</td>
<td>boolean</td>
<td>true</td>
</tr>
<tr>
<td>extra</td>
<td>额外内容</td>
<td>boolean</td>
<td>null</td>
</tr>
</tbody>
</table>
<h4>Filter.type</h4>
<p>City(城市选择), List(列表选择，可以多选或者单选), Range(数据范围), Text(文字输入) Text.Number, Selector(下拉选项), Check(单项选择), RadioList(单选列表),
CheckboxList（多选列表）</p>
<p>DateTime(时间选择),DateTime.Time DateTime.Range DateTime.Week DateTime.Month DateTime.Year</p>
<p>公共参数</p>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>label</td>
<td>筛选项名称</td>
<td>string</td>
<td>-</td>
</tr>
<tr>
<td>name</td>
<td>筛选项的key</td>
<td>string</td>
<td>-</td>
</tr>
<tr>
<td>placeholder</td>
<td>筛选项的placeholder(如果可以显示的话)，如果不传值通常会去label的值</td>
<td>string</td>
<td>-</td>
</tr>
</tbody>
</table>
<h4>Text|Text.Number|Range</h4>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>onBeforeSearch</td>
<td>带有确定按钮的筛选项，在点击确定后会调用该方法，如果该方法返回为false，则该选项的值不会被提交给筛选项</td>
<td>function</td>
<td>-</td>
</tr>
</tbody>
</table>
<h5>Range|DateTime.Range</h5>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>template</td>
<td>将一组数据范围显示成一段用户可阅读的问题的模版，参数为筛选项的值,要求返回一个描述的字符串</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>placeholder</td>
<td>当为字符串时前后两个输入框显示同样内容，当为一个数组时，第一个输入框显示数组的第一个值，第二个输入框显示为数组的第二个值</td>
<td>string|array</td>
<td>-</td>
</tr>
</tbody>
</table>
<h4>List</h4>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>children</td>
<td>筛选项的每一项的值，必须为 List.Item</td>
<td>List.Item</td>
<td>-</td>
</tr>
</tbody>
</table>
<h4>List.Item</h4>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>value</td>
<td>筛选项的值</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>label</td>
<td>筛选项显示项</td>
<td>string</td>
<td>-</td>
</tr>
</tbody>
</table>
<p>其他参数参考对应内部组件的参数</p>`,
    example: {
        isFull: true,
        className: `react_filter_c85ff`,
        style: ``,
        list: [{
    title: `基础示例`,
    description: `展示一个筛选器的普通模式`,
    code: `const {useState} = React;
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
            antdMessage.error(\`提交被拦截，输入值\${value}\`);
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
            return \`\${value[1]}岁以下\`;
        }
        if (!isNumber(value[1]) && isNumber(value[0])) {
            return \`\${value[0]}岁以上\`;
        }
        return \`\${value[0]}-\${value[1]}岁\`;
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
                                                                                return \`\${value[1]}k以下\`;
                                                                            }
                                                                            if (!isNumber(value[1]) && isNumber(value[0])) {
                                                                                return \`\${value[0]}k以上\`;
                                                                            }
                                                                            return \`\${value[0]}k-\${value[1]}k\`;
                                                                        }
                                                                    })}/>, <Check label="海外经历" name="out"/>]]}/>;
};

render(<BaseExample/>);

`,
    scope: [{
    name: "reactFilter",
    packageName: "@kne/react-filter",
    component: component_203
},{
    name: "",
    packageName: "@kne/react-filter/dist/index.css",
    component: null
},{
    name: "message",
    packageName: "antd/lib/message",
    component: component_205
},{
    name: "_",
    packageName: "lodash",
    component: component_206
}]
},{
    title: `简单示例`,
    description: `展示一个简单的筛选项，一般放在列表页title extra位置`,
    code: `const {useState} = React;
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

`,
    scope: [{
    name: "reactFilter",
    packageName: "@kne/react-filter",
    component: component_203
},{
    name: "",
    packageName: "@kne/react-filter/dist/index.css",
    component: null
},{
    name: "space",
    packageName: "antd/lib/space",
    component: component_208
}]
}]
    }
};
export default readmeConfig;
