import React from "react";
import {createCitySelect, apis, RemoteData, DisplayCity} from "@kne/react-city-select";
import List from "../List";

const {Item} = List;

const City = ({label, labelHidden, name, size, isMore, ...props}) => {
    return <List labelHidden={labelHidden} label={label} name={name} size={size} more={{
        children: "其他", onClick: ({value, onChange}) => {
            createCitySelect({
                size, defaultValue: value.map(({value}) => value), onChange: (value) => {
                    Promise.all(value.map((id) => apis.getCity(id).then(({city}) => ({
                        label: city.name, value: city.code
                    })))).then((value) => onChange(value));
                }
            });
        }
    }}>
        {({value: currentValue}) => <>
            <RemoteData loader={apis.getChinaHotCities}>{(data) => {
                const otherList = currentValue.filter(({value: code}) => !data.find((item) => item.code === code));
                let extraLength = 0;
                data.forEach((item, index) => {
                    if (currentValue.findIndex(({value}) => value === item.code) > -1 && index >= data.length - otherList.length) {
                        extraLength += 1;
                    }
                });
                return <>
                    {otherList.map(({value: code}) => {
                        return <DisplayCity id={code} key={code}>{({city: item}) => {
                            return <Item value={code} label={item.name}/>;
                        }}</DisplayCity>;
                    })}
                    {data.filter((item, index) => currentValue.findIndex(({value}) => value === item.code) > -1 || index < data.length - otherList.length - extraLength).map((item) =>
                        <Item key={item.code} value={item.code} label={item.name}/>)}
                </>;
            }}</RemoteData>
        </>}
    </List>;
};

export default City;
