import React from 'react'
import ReactDOM from 'react-dom'


// 通过使用引号，来将属性值指定为字符串字面量
// const element = <div tabIndex="0"></div>

// const user = {
//   avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0306%2F701a4922j00qpjng1001nc000ht00dom.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646308771&t=376abf8646bcad35c9394b6b82c363b4'
// }
// 通过使用大括号，来在属性值中插入一个js表达式
// 如果标签里面没有内容，可以使用 />闭合标签
// const element = <img src={user.avatarUrl} />

// jsx标签里可以包含很多子元素
// const element = (
//   <div>
//     <h1>Hello</h1>
//     <h2>you see see you</h2>
//   </div>
// )

// ReactDOM.render(
//   element,
//   document.getElementById('root')
// )


// function tick() {
//   const element = (<div>
//     <h1>hello, world!</h1>
//     <h2>It is {new Date().toLocaleTimeString()}</h2>
//   </div>)

//   ReactDOM.render(element, document.getElementById('root'))
// }


// setInterval(tick, 1000)

// 函数组件
// function Welcome(props) {
//   return <h1>hello, {props.name}</h1>
// }

// class定义
// class Welcome extends React.Component {
//   render() {
//     return <h1>hello, {this.props.name}</h1>
//   }
// }

// const element = <Welcome name="大姐姐1"/>

// function App() {
//   return (
//     <div>
//       <Welcome name="大姐姐" />
//       <Welcome name="大姐姐1" />
//       <Welcome name="大姐姐2" />
//     </div>
//   )
// }

// 过程
// 调用ReactDOM.render()函数，传入<Welcome name="大姐姐1" />作为参数
// React调用Welcome组件，将 {name: '大姐姐1'}作为props传入
// Welcome组件将<h1>Hello, 大姐姐1</h1>元素作为返回值
// React DOM将DOM高效地更新为<h1>Hello, 大姐姐1</h1>


// 提取组件
// function formatDate(text) {
//   return text
// }
// // 建议从组件自身角度命名props
// function Avatar(props) {
//   return (<img 
//     src={props.user.avatarUrl}
//     alt={props.user.name}
//   />)
// }

// function UserInfo(props) {
//   return (
//     <div className="user-info">
//       <Avatar user={props.user} />
//       <div className="user-info-name">
//         {props.user.name}
//       </div>
//     </div>
//   )
// }

// function Comment(props) {
//   return (<div className="comment">
//     {/* <div className="user-info">
//       <img className="avatar" 
//         src={props.author.avatarUrl}
//         alt={props.author.name}
//       />
//       <div className="user-info-name">
//         {props.author.name}
//       </div>
//     </div> */}
//     <UserInfo user={props.author}/>
//     <div className="comment-text">
//       {props.text}
//     </div>
//     <div className="comment-date"> 
//       {formatDate(props.date)}
//     </div>
//   </div>)
// }


// ReactDOM.render(
//   // Welcome({
//   //   name: '大姐姐'
//   // }),
//   // element,
//   Comment({
//     author: {
//       name: '李健',
//       avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0306%2F701a4922j00qpjng1001nc000ht00dom.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646308771&t=376abf8646bcad35c9394b6b82c363b4'
//     },
//     text: '李健呜呜呜呜',
//     date: '2020-01-01'
//   }),
//   document.getElementById('root')
// )

//  封装时钟的外观
// function Clock(props) {
//   return (<div>
//     <h1>Hello, world!</h1>
//     <h2>It is {props.date.toLocaleTimeString()}</h2>
//   </div>)
// }

// function tick() {
//   ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
//   )
// }

// setInterval(tick, 1000)

// 把函数组件转换成class组件
// 1. 创建一个同名的ES6 class，并且继承于React.Component
// 2. 添加一个空的render()方法
// 3. 将函数体移动到render()方法之中
// 4. 在render()方法中使用this.props替换props
// 5. 删除剩余的空函数声明

// 每次组件更新，render方法都会被调用，但只要在相同的DOM节点中渲染<Clock />，就仅有一个Clock组件的class实例被创建使用。
// 这就使得我们可以使用如state或生命周期方法等很多其他特性

// 1. <Clock />传给ReactDOM.render()的时候，react调用clock的构造函数。所以需要初始化this.state 
// 2. render调用组件的render()方法。确定该页面上展示什么，然后更新DOM匹配clock的渲染输出
// 3. clock输出被插入到DOM中，react调用ComponentDidMount()生命周期方法。clock组件向浏览器请求设置一个定时器每秒调用一次组件的tick方法
// 4. clock组件会通过调用setState()来计划进行一次ui更新。 setState()调用后，react能够知道state已经改变，然后会重新调用render()方法来确定页面上该显示什么
// 5. Clock组件从DOM中被移除，react调用componentWillUnmount()生命周期方法，清除计时器
function FormattedDate(props) {
  return <h2>数据是向下流动的：{props.date.toLocaleTimeString()}</h2>
}



class Clock extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {date: new Date()}
  }

  componentDidMount() {
    this.timerID = setInterval(() => 
      this.tick(), 1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return <div>
      <h1>Hello, world!2</h1>
      <h2>It is {this.state.date.toLocaleString()}</h2>
      <FormattedDate date={this.state.date} />
    </div>
  }
}
// 事件处理
function activateLasers() {
  alert('activate')
}

// 阻止默认行为
function ActionLink() {
  function handleClick(e) {
    e.preventDefault()

    console.log('The link was clicked')
  }

  return (
    <a href="http://www.baidu.com" onClick={handleClick}>
      阻止默认行为
    </a>
  )
}


class Toggle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isToggleOn: true
    }
    // 为了在回调中使用this，绑定必不可少
    // this.changeToggle = this.changeToggle.bind(this)
  }

  changeToggle (){
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }

  render() {
    return (
    <button
      // 箭头函数作为props传入子组件时，组件可能会进行额外的重新渲染
      // 通常建议在构造器中绑定或者使用class fields语法来避免性能问题 
      onClick={() => this.changeToggle()}
    >
      {this.state.isToggleOn ? 'On' : 'Off'}
    </button>
    )
  }
}


// 7. 条件渲染
function UserGetting() {
  return <div>userGetting</div>
}

function GuestGetting() {
  return <div>guestGetting</div>
}

function Getting(props) {
  if (props.isUser) {
    return <UserGetting />
  }

  return <GuestGetting />
}


function Login(props) {
  return <button onClick={props.onClick}>Login</button>
}

function Logout(props) {
  return <button onClick={props.onClick}>Logout</button>
}
class LoginCtrol extends React.Component {
  constructor(props) {
    super(props)

    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)

    this.state = {
      isLogin : false
    }
  }

  handleLoginClick() {
    this.setState({
      isLogin: true
    })
  }

  handleLogoutClick() {
    this.setState({
      isLogin: false
    })
  }


  render() {
    const { isLogin } = this.state
    let button
    if (isLogin) {
      button = <Logout onClick={this.handleLogoutClick}/>
    } else {
      button = <Login onClick={this.handleLoginClick}/>
    }


    return (
      <div>
        <Getting isUser={isLogin}/>
        { button }
      </div>
    )
  }
}

// 与运算符
function Mailbox(props) {
  const unreadMessage = props.unreadMessage

  return (<div>
    <div>hello</div>
      { unreadMessage.length > 0 && <div>你有{ unreadMessage.length }条只读数据</div> }
  </div>)
}

const message = ['李健', '千玺', '炎亚纶']


// 三目运算符
class Ternary extends React.Component {
  constructor(props) {
    super(props)

    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = {
      isLogin: true
    }
  }

  handleLoginClick() {
    this.setState({
      isLogin: true
    })
  }

  handleLogoutClick() {
    this.setState({
      isLogin: false
    })
  }
  render() {
    return (<div>
      <div>The user is { this.state.isLogin ? 'currently' : 'not' } Login in</div>
      { this.state.isLogin ? <Logout onClick={this.handleLogoutClick}/> : <Login onClick={this.handleLoginClick}/> }
    </div>)
  }
}

// 阻止组件渲染
function WarningBanner(props) {
  
  if (!props.warn) {
    return null
  }

  return (<div>
    Warning!
  </div>)
}

class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isWarning: true
    }

    this.handleToggleClick = this.handleToggleClick.bind(this)
  }


  handleToggleClick() {
    this.setState((state) => (
      {
        isWarning: !state.isWarning
      }
    ))
  }

  render() {
    return (<div>
        <WarningBanner warn={this.state.isWarning}/>

      <button
        onClick={this.handleToggleClick}
      > 
        {this.state.isWarning ? 'hide' : 'show'}
      </button>
    </div>)
  }
}
// =========== 列表&key ==============
// doubled
const numbers = [1, 2, 3, 4, 5]
const double = numbers.map(number => number * 2)
console.log(double)

// 渲染多个组件
const listItems = numbers.map(number => <li key={number.toString()}>{number}</li>)

// 基础列表组件
function NumbersList(props) {
  const { numbers = [] } = props

  const listItems = numbers.map(number => <li key={number.toString()}>{number}</li>)

  return (<ul>{listItems}</ul>)
}

//key
const todos = [{
  id: '1',
  text: '李健'
}, {
  id: '2',
  text: '千玺'
}]
// 使用id作为key
const todoItems = todos.map(item => <li key={item.id}>{item.text}</li>)
// 用key提取组件
function todoItem(props) {
  return <div>{props.text}</div>
}

function TodoList(props) {
  const { todos } = props
  // 正确的key应该在数组的上下文被指定;即在map方法中的元素需要设置key
  const todoItems = todos.map(item => <li key={item.id}>{item.text}</li>)

  return (<ul>{todoItems}</ul>)
}
// key只是在兄弟节点中必须唯一
function Blog(props) {
  const sidebar = (<ul>{props.posts.map(item => <li key={item.key}>{item.title}</li>)}</ul>)

  const content = (<div>{
    props.posts.map(item => <div key={item.key}>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
    </div>)
  }</div>)

  return (<div>
    {sidebar}
    <hr />
    {content}
  </div>)
}

const posts = [
  {key: 1, title: 'hello world', content: 'welcome to leaning react'},
  {key: 2, title: 'installation', content: 'you can install react from npm'}
]

// key不会传递给组件
function PostItem(props) {
  const {key, id} = props

  return <div>
    <span>id: {id}</span>
    <span>key: {key}</span>
  </div>
}

function Posts(props) {
  const content = props.posts.map(item => <PostItem id={item.id} key={item.key}/>)

  return content
}

// 在JSX中嵌入map
function ListItem(props) {
  return <li>{props.value}</li>
}
function NumberList(props) {
  const listItems = props.numbers.map(item => <ListItem key={item.toString()} value={item}/>)

  return (<ul>{listItems}</ul>)
}

// jsx可以在{}中嵌入任何表达式，内联map
function NumberListInline(props) {
  return (<ul>{props.numbers.map(item => <ListItem key={item.toString()} value={item}/>)}</ul>)
}

// ========== 表单 ============= 
// 纯HTML表单
function HtmlForm() {
  return (<form>
    <label>名字 <input name="name" type="text" /></label>
    <input type="submit" value="提交" />
  </form>)
}
// 受控组件
class NameForm extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      value: undefined
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {

    this.setState({
      value: e.target.value
    })
  }

  onSubmit(e) {
    alert(this.state.value)
    e.preventDefault()
  }


  render() {
    return (<form>
      <label>
        姓名 <input name="name" type="text" value={this.state.value} onChange={this.onChange}/>
      </label>
      <input type="submit" value="提交" onClick={this.onSubmit}/>
    </form>)
  }
}

// textarea标签
function HtmlTextArea() {
  return <textarea>这里时textarea标签</textarea>
}

class Essay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '随便写啥'
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }


  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit(e) {
    alert(this.state.value)

    e.preventDefault()
  }


  render() {
    return (<form>
      <label>文章：<textarea value={this.state.value} onChange={this.onChange} /></label>
      <input type="submit" onClick={this.onSubmit} />
    </form>)
  }
}
// select 标签
function HtmlSelect() {
  return <select>
    <option value='1'>大姐姐</option>
    <option value='2' selected>李健</option>
    <option value='3'>鸣人</option>
  </select>
}


class FlavorForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ['1', '2']
    }

    this.onChange=this.onChange.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  } 

  onSubmit(e) {
    alert(this.state.value)
    e.preventDefault()
  }

  render() {
    return (<form>
      <label>
        最喜欢的
        <select multiple={true} value={this.state.value} onChange={this.onChange}>
          <option value="1">大姐姐</option>
          <option value="2">李健</option>
      </select>
    </label>
    <input type="submit" onClick={this.onSubmit}/>
    </form>)
  }
}

// 文件input标签
function FileInput() {
  return <input type="file"/>
}

// 处理多个输入
class Reservation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isGoing: true,
      numberOfGuest: 2
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { target } = e

    const value = target.name === 'isGoing' ? target.checked : target.value

    this.setState({
      [target.name]: value
    })
  }

  render() {
    return (<form>
      <label>参与： <input name="isGoing" type="checkbox" value={this.state.isGoing} onChange={this.handleChange}/></label>
      <label>人数: <input name="numberOfGuest" type="number" value={this.state.numberOfGuest} onChange={this.handleChange}/></label>
    </form>)
  }
}

// 受控输入空值
// ReactDOM.render(<input value="1"/>, document.getElementById('empty'))
// setTimeout(function() {
//   ReactDOM.render(<input value={null}/>, document.getElementById('empty'))
// }, 2000)


// 每个组件都是独立的,单向数据流
function App() {
  return (<div>
    <Clock />
    <Clock />
    <Clock />
    <button onClick={activateLasers}>
      activate lasers
    </button>
    <ActionLink />
    <Toggle />
    {/* 条件渲染 */}
    <h2>条件渲染</h2>
    <h3>if或者条件运算</h3>
    <Getting isUser={true}/>
    <Getting isUser={false}/>
    <LoginCtrol />
    <h3>与运算符</h3>
    <Mailbox unreadMessage={message}/>
    <h3>三目运算符</h3>
    <Ternary />
    <h3>阻止组件渲染</h3>
    <Page />
    <h2>列表&key</h2>
    <h3>渲染多个组件</h3>
    <ul>{listItems}</ul>
    <h3>基础列表组件</h3>
    <NumbersList numbers={numbers}/>
    <h3>key</h3>
    <span>key帮助react识别哪些元素改变了。一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。</span>
    <span>当元素id没有确定时，迫不得已可以使用元素索引index作为key。如果列表变化，会导致性能变差，还可能引起组件状态问题。</span>
    <h3>用id作为key</h3>
    <ul>{todoItems}</ul>
    <h3>用key提取组件</h3>
    <TodoList todos={todos} />
    <h3>key只是在兄弟节点中必须唯一</h3>
    <Blog posts={posts}/>
    <h3>key不会传递给组件</h3>
    PostItem: `key` is not a prop
    <Posts posts={posts}/>
    <h3>在JSX中嵌入map</h3>
    <NumberList numbers={numbers}/>
    <h3>内联map</h3>
    <span>JSX可以在{}中嵌入任何表达式</span>
    <NumberListInline numbers={numbers}/>
    <h2>表单</h2>
    <h3>纯HTML表单</h3>
    <span>表单的默认行为：提交表单后刷新页面</span>
    <HtmlForm />
    <h3>受控组件</h3>
    <NameForm />
    <h3>textarea标签</h3>
    <span>在html中textarea通过子元素确定内容</span>
    <HtmlTextArea />
    <Essay />
    <h3>select标签</h3>
    <HtmlSelect />
    <FlavorForm />
    <h3>文件input标签</h3>
    <span>因为value是只读的，所以只非控组件</span>
    <FileInput />
    <h3>处理多个输入</h3>
    <Reservation />
    <h3>受控组件输入空值</h3>
    <span>如果受控组件指定value的props，会阻止用户更改输入。 undefined或者null除外</span>
  </div>)
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


