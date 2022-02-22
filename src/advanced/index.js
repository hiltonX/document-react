import React, {Fragment, Suspense} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import ErrorBoundry from './error-boundry'

const OtherComponent = React.lazy(() => import('./other-component'))
const AnotherComponent = React.lazy(() => import('./another-component'))

// ========= 无障碍 =========
// 标准和指南
function Input() {
  return (<input 
    type="text"
    aria-label="name"
    aria-requied={true}
    onChange={() => console.log('onChange')}
    placeholder="aria-*"
    name="name"
  />)
}

// 语义化的html
function ListItem(props) {
  return (<Fragment>
    <dt>{props.item.term}</dt>
    <dd>{props.item.description}</dd>
  </Fragment>)
}

function Glossary(props) {
  return (<dl>
    {props.items.map(item => <ListItem item={item} key={item.id}/>)}
  </dl>)
}

// 短语法
function ShortListItem({item}) {
  return (<>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  )
}

function ShortGlossary(props) {
  return (<dl>
    {props.items.map(item => <ListItem item={item} id={item.id}/>)}
  </dl>)
}

// 标记
function Sign() {
  return (<div>
    <label htmlForm="nameInput">Name</label>
    <input id="nameInput" type="text" name="name"/>
  </div>)
}

// 使用程序管理焦点
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)

    this.textInput = React.createRef()
  }

  componentDidMount() {
    this.textInput.current.focus()
  }

  render() {
    return (<input 
      type="text"
      ref={this.textInput}
    />)
  }
}

// 对父组件暴露DOM ref
function ChildCustomTextInput(props) {
  return (<div>
    <input ref={props.textInput}/>
  </div>)
} 

class Parent extends React.Component {
  constructor(props) {
    super(props)

    this.inputElement = React.createRef()


    console.log(this.inputElement)
  }


  componentDidMount() {
    // this.inputElement.current.focus()
  }

  render() {
    return (<ChildCustomTextInput inputRef={this.inputElement}/>)
  }
}

// 鼠标和指针事件
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props)

    this.toggleContainer = React.createRef()

    this.state = {
      isOpen: false
    }

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onClickOutsiderHandler = this.onClickOutsiderHandler.bind(this)
  }
  
  componentDidMount() {
    window.addEventListener('click', this.onClickOutsiderHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsiderHandler)
  }


  onClickHandler() {
    this.setState((state) => ({
      isOpen: !state.isOpen
    }))
  }

  onClickOutsiderHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({
        isOpen: false
      })
    }
  }

  render() {
    return (<div ref={this.toggleContainer}>
      <button onClick={this.onClickHandler}>Select an option</button>
      {this.state.isOpen && (<ul>
        <li>李健</li>
        <li>千玺</li>
      </ul>)}
    </div>)
  } 
}

// 键盘设备
class BlurExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onBlurHandler = this.onBlurHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
  }

  onClickHandler() {
    this.setState((state) => ({
      isOpen: !state.isOpen
    }))
  }

  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      })
    })
  }

  onFocusHandler() {
    clearTimeout(this.timeOutId)
  }

  render() {
    return (<div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
      <button onClick={this.onClickHandler}
              aria-haspopup="true"
              aria-expended={this.state.isOpen}
      >
        Select an option
      </button>
      {this.state.isOpen && <ul>
        <li>李健</li>
        <li>千玺</li>
      </ul>}
    </div>)
  }
}
// ======= 代码分割 ======
// import()
import('./math').then(math => {
  console.log(math.add(1, 2))
})

// react.lazy

function MyComponent() {
  return (<div>
    <Suspense fallback={<div style={{color: 'red'}}>loading....</div>}>
      <OtherComponent />
    </Suspense>
  </div>)
}

// 包裹多个组件
function MultiMyComponent() {
  return (<div>
    <Suspense fallback={<div>loading</div>}>
      <section>
        <OtherComponent />
        <AnotherComponent />
      </section>
    </Suspense>
  </div>)
}


// 异常捕获边界
function CatchErrorBoundry(){
  return (<div>
    <ErrorBoundry>
      <Suspense fallback={<div>loading</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </ErrorBoundry>
  </div>)
}

// 基于路由分割
const App = () => (
  <Router>
    <Suspense fallback={<div>loading.....</div>}>
      <Routes>
        <Route path="/other" component={OtherComponent} />
        <Route path="/another" component={AnotherComponent} />
      </Routes>
    </Suspense>
  </Router>
)

// 命名导出
const MyRenameComponent = React.lazy(() => import('./myRename-component'))

// 何时使用Context
// 传统传递Props
class TranditionalProps extends React.Component {
  render() {
    return (<ToolBar theme="dark"/>)
  }
}

function ToolBar(props) {
  return (<ThemeButton theme={props.theme}/>)
}

class ThemeButton extends React.Component {
  render() {
    return (<button theme={this.props.theme}>传统传递Props</button>)
  }
}

// 使用context
const ThemeContext = React.createContext('light')

class ContextProps extends React.Component {
  render() {
    return (<ThemeContext.Provider value="dark" test="test">
      <ContextToolBar />
    </ThemeContext.Provider>)
  }
}

function ContextToolBar() {
  return (<ContextThemeButton />)
}

class ContextThemeButton extends React.Component {
  static contextType = ThemeContext

  render() {
    return (<button theme={this.context}>context传递props</button>)
  }
}

// 深度嵌套
function DeepPage(props) {
  return (<DeepPageLayout user={props.user} avatarSize={props.avatarSize} />)
}

function DeepPageLayout(props) {
  return (<DeepNavigationBar user={props.user} avatarSize={props.avatarSize}/>)
}

function DeepNavigationBar(props) {
  return (<DeepUser user={props.user} avatarSize={props.avatarSize}/>)
}

function DeepUser(props) {
  return (<div>用户名：{props.user.name}；avatarSize: {props.avatarSize}</div>)
}

// 传递组件自身
function ComponentPage(props) {
  const ComponentUser = (<div>用户名：{props.user.name};avatarSize: {props.avatarSize}</div>)

  return (<ComponentPageLayout user={ComponentUser}/>)
}

function ComponentPageLayout(props) {
  return (<ComponentNavigationBar user={props.user}/>)
}

function ComponentNavigationBar(props) {
  return (<ComponentUser user={props.user}/>)
}

function ComponentUser(props) {
  return (props.user)
}

// 多个组件
function SlotPage(props) {
  const { user } = props
  const content = <Feed user={user}/>
  const topBar = (<SlotNavigationBar>
    <div>用户名：{props.user.name};avatarSize:{props.avatarSize}</div>
  </SlotNavigationBar>)

  return (<SlotPageLayout 
    topBar={topBar}
    content={content}
  />)
}

function Feed(props) {
  return (<div>{props.user.name}是首帅</div>)
}

function SlotNavigationBar(props) {
  return (<div>用户信息：{props.children}</div>)
}

function SlotPageLayout(props) {
  return (<div>
    <div>topBar: {props.topBar}</div>
    <div>content: {props.content}</div>
  </div>)
}

// API
// React.createContext
const DefaultContext = React.createContext('defaultvalue')

class DefaultValue extends React.Component {
  static contextType = DefaultContext

  render() {
    return (<div id={this.context}>React.createContext</div>)
  }
}

// Context.Provider
class ProviderValue extends React.Component {
  static contextType = DefaultContext

  render() {
    return(<div>Context.Provider, value: {this.context}</div>)
  }
}

// class.contextType
const MyContext = React.createContext('李健')

class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context

    console.log(value + '--componentDidMount')
  }

  componentDidUpdate() {
    let value = this.context

    console.log(value + '--componentDidUpdate')
  }

  componentWillUnmount() {
    let value = this.context

    console.log(value + '--componentWillUnmount')
  }

  render() {
    let value = this.context
    return (<div>class.contextType, value: {value}</div>)
  }
}

MyClass.contextType = MyContext

class RenderMyClass extends React.Component {
  static contextType = MyContext

  render() {
    return (<div>class.contextType, value: {this.context}</div>)
  }
}

// context.consumer
function ConsumerClass(props) {

  return (<MyContext.Consumer value="b">
    {value => (<div>context.consumer, value: {value}</div>)}
  </MyContext.Consumer>)
}
export default class Advanced extends React.Component {

  render() {
    return (<div>
      <div className="title">无障碍</div>
      <div className="sub-title">无障碍辅助功能</div>
      <div className="des">无障碍辅助功能是使得辅助技术正确解读网页的必要条件</div>
      <div className="sub-title">标准和指南</div>
      <Input />
      <div className="sub-title">语义化的HTML</div>
      <div className="des">语义化的HTML是无障碍辅助功能网络应用的基础</div>
      <Glossary 
        items={[{id: 1, term: '首先', description: '李健'}, {id: 2, term: '其次', description: '千玺'}]}
      />
      <div className="des">不需要在fragment使用props并且工具支持时，可以使用短语法</div>
      <ShortGlossary 
        items={[{id: 1, term: '首先', description: '李健'}, {id: 2, term: '其次', description: '千玺'}]}
      />
      <div className="sub-title">无障碍表单</div>
      <div className="sub-title">标记</div>
      <Sign />
      <div className="sub-title">使用程序管理焦点</div>
      <CustomTextInput />
      <div className="des">对父组件暴露DOM refs</div>
      <Parent />
      <div className="sub-title">鼠标和指针事件</div>
      <OuterClickExample />
      <div className="des">键盘设备</div>
      <BlurExample />
      <div className="title">代码分割</div>
      <div className="sub-title">import()</div>
      <div className="des">代码分割的最佳方式是通过动态import()语法，CRA 开箱即用</div>
      <div className="sub-title">React.lazy</div>
      <div className="des">代码会在首次渲染时自动导入包含OtherComponent组件的包</div>
      <MyComponent />
      <div className="des">包裹多个懒加载组件</div>
      <MultiMyComponent />
      <div className="sub-title">异常捕获边界</div>
      <CatchErrorBoundry />
      <div className="sub-title">基于路由的代码分割</div>
      <App />
      <div className="sub-title">命名导出</div>
      <Suspense fallback={<div>loading....</div>}>
        <MyRenameComponent />
      </Suspense>
      <div className="title">Context</div>
      <div className="des">Context提供了一种在组件之间共享此类值的方式，而不必显式的通过组件树的逐层传递props</div>
      <h3>何时使用Context</h3>
      <div className="des">Context设计的目的是为了共享那些对于一个组件库而言是全局的数据。例如当前认证的用户</div>
      <div className="sub-title">传统传递Props</div>
      <TranditionalProps />
      <div className="sub-title">Context传递Props</div>
      <ContextProps />
      <div className="sub-title">使用Context之前的考虑</div>
      <div className="des">会使组件的复用性变大</div>
      <div className="sub-title">深度嵌套</div>
      <DeepPage user={{name: '李健',}} avatarSize="60"/>
      <div className="sub-title">传递组件自身</div>
      <ComponentPage user={{name: '千玺'}} avatarSize="100"/>
      <div className="sub-title">多个组件</div>
      <SlotPage user={{name: '李健'}} avatarSize="200"/>
      <div className="sub-title">API</div>
      <DefaultValue />
      <ProviderValue />
      <MyClass />
      <RenderMyClass />
      <ConsumerClass />
      <div className="des">
        <div>Context.displayName</div>
        <div>const context = react.createContext('displayName')</div>
        <div>context.displayName = 'aaa'</div>
      </div>

    </div>)
  }
}
