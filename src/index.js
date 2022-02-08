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
  </div>)
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)