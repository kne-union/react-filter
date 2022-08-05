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
