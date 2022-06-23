import React, {useState} from "react";
import Filter, {createExtraButton} from "@kne/react-filter";
import isNumber from "lodash/isNumber";

const {City, List, Range, Text, Selector, Check} = Filter.type;

const App = () => {
    const [value, setValue] = useState({});
    return <><Filter value={value} extra={<button>重置</button>} onChange={(value) => {
        setValue(value);
        console.log(value);
    }} list={[[<City label="目前城市" name="currentCity" size={5}/>], [<List label="学历" name="degree" size={1}>
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
                                                                    })}/>, <Check label="海外经历" name="out"/>]]}/>
        <div>{JSON.stringify(value, null, 2)}</div>
    </>;
};

export default App;
