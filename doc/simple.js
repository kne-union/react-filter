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
