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

| 属性名      | 说明                      | 类型        | 默认值 |
|----------|-------------------------|-----------|-----|
| children | 筛选项的每一项的值，必须为 List.Item | List.Item | -   |

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
