## 精读react文文档

### Hello World
- 如果你在过去几年中并没有使用过 JavaScript，大多数情况下这三点应该能帮到你。
https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c（打不开）

### JSX简介
- 建议将内容包裹在括号中，不是强制要求，但是可以避免遇到自动插入分号陷阱

- React DOM 在渲染所有输入内容之前，默认会惊醒转义/可以确保在应用中不会注入非自己明确编写的内容，所有内容在渲染之前都专程了字符串，可以防止XSS攻击


### 元素渲染
- 元素描述了你在屏幕上想看到的内容，组件是由元素构成的

- React元素是创建开销极小的普通对象，React DOM会负责更新DOM来与React元素保持一致

### 组件&&Props
- 纯函数：不修改入参，多次调用下相同入参始终返回相同结果

- 所有的React组件都必须像纯函数一样保护他们的props不被更改

### State&&生命周期
- State与props类似，但是state是私有的，并且完全受控于当前组件

- 正确地使用State
1. 不要直接修改State，而要使用setState。构造函数是唯一可以给this.state赋值的地方
2. State的更新可能是异步的。this.props和this.state可能会被异步更新，所以不要依赖他们更新下一个状态
3. State的更新会被合并，合并是浅合并？？？
```
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
  }


  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      })
    })

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      })
    })
  }


```