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
class Welcome extends React.Component {
  render() {
    return <h1>hello, {this.props.name}</h1>
  }
}

const element = <Welcome name="大姐姐1"/>
// 过程
// 调用ReactDOM.render()函数，传入<Welcome name="大姐姐1" />作为参数
// React调用Welcome组件，将 {name: '大姐姐1'}作为props传入
// Welcome组件将<h1>Hello, 大姐姐1</h1>元素作为返回值
// React DOM将DOM高效地更新为<h1>Hello, 大姐姐1</h1>
ReactDOM.render(
  // Welcome({
  //   name: '大姐姐'
  // }),
  element,
  document.getElementById('root')
)
