import React, {Fragment, Suspense} from 'react'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import hoistNonReactStatics from 'hoist-non-react-statics'
import $ from 'jquery'

import ErrorBoundry from './error-boundry'
import ThemedButton from './themed-button'
import {themes, DynamicThemeContext} from './theme-context'
import {nestThemes, NestThemesContext} from './nest-theme-context'
import NestThemedButton from './nest-themed-button'
import ErrorBoundary from './error-boundary'

import ImportStaticMethod, {one} from './import-staticMethod'

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


// 动态context
function DynamicToolBar(props) {
  return(<ThemedButton onClick={props.changeThemes}>
    ChangeTheme
  </ThemedButton>)
}
class DynamicTheme extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: themes.light
    }

    this.toggleThemes = () => {
      this.setState(state =>({
        theme: state.theme === themes.dark ? themes.light : themes.dark
      }))
    }
  }

  render() {
    return (<div>
      <DynamicThemeContext.Provider value={this.state.theme}>
         <DynamicToolBar 
            changeThemes={this.toggleThemes}
         />
      </DynamicThemeContext.Provider>
      <section>
        <ThemedButton />
      </section>
    </div>)
  }
}

// 在嵌套组件中更新context
class NestApp extends React.Component {
  constructor(props) {
    super(props)

    this.toggleThemes = () => {
      this.setState((state) => ({
        theme: state.theme === nestThemes.red ? nestThemes.white : nestThemes.red
      }))
    }

    this.state = {
      theme: 'white',
      toggleThemes: this.toggleThemes
    }
  }

  render() {
    return (<NestThemesContext.Provider value={this.state}>
      <NestThemedButton>在嵌套组件中更新context</NestThemedButton>
    </NestThemesContext.Provider>)
  }
}

// 消费多个context
const SidebarContext = React.createContext('sidebar-context')
const ContentContext = React.createContext({
  message: 'content-context',
})

class MuchContextComponent extends React.Component {
  render() {
    const {userName, message} = this.props

    return (<SidebarContext.Provider value={userName}>
      <ContentContext.Provider value={message}>
        <MuchContextPageLayout />
      </ContentContext.Provider>
    </SidebarContext.Provider>)
  }
}


function MuchContextPageLayout() {
  return (
    <div>
      <div>消费多个context</div>
      <MuchContent />
    </div>
  )
}

function MuchContent() {
  return (<SidebarContext.Consumer>{
    (userName) => (<ContentContext.Consumer>{
      (message) => (
        <div>sidebar: {userName}; content: {message}</div>
      )
    }</ContentContext.Consumer>
    )
  }</SidebarContext.Consumer>)
}

// 注意事项
const TipContext = React.createContext({
  something: 'default'
})

function ConsumerToolBar() {
  return (<TipContext.Consumer>
  {({something}) => (<div>注意事项：{something}</div>)}
  </TipContext.Consumer>)
}
// 多次渲染
class RenderApp extends React.Component {
  render() {
    return (<TipContext.Provider value={{something: 'something'}}>
      <ConsumerToolBar />
    </TipContext.Provider>)
  }
}

class StateApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      something: 'something'
    }
  }

  render() {
    return (<TipContext.Provider value={this.state}>
      <ConsumerToolBar />
    </TipContext.Provider>)
  }
}

// 错误边界

function ErrorApp() {
  return(<ErrorBoundary>
    <MyWidget />
  </ErrorBoundary>)
}

class MyWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 1
    }
    alert(this.stat.a)
  }
  render() {
    return (<div>myWidget</div>)
  }
}
// 关于事件处理器
class TryCatchComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {error: null}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    
    try{
      alert(this.stat.a)
      console.log('try')
    } catch(error) {
      this.setState({
        error
      })
    }
  }

  render() {
    if(this.state.error) {
      return <div>事件错误</div>
    }

    return (<button onClick={this.handleClick}>关于事件处理器</button>)
  }
}

// =========== refs 转发 ============
// 渲染原生button
function FancyButton(props) {
  return (<button className="FancyButton">
    {props.children}
  </button>)
}
// 改造，转发refs到DOM组件
const RefsFancyButton = React.forwardRef((props, ref) => (
  <button 
    ref={ref} className="FancyButton"
    onClick={() => {
      console.log(ref)
    }}
  >
    {props.children}
  </button>
))

const ref = React.createRef()

// 在高阶组件中转发refs
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(preProps) {
      console.log('old props', preProps)
      console.log('new props', this.props)
    }

    render() {
      return (<WrappedComponent {...this.props}/>)
    }
  }

  return LogProps
}


class PropsFancyButton extends React.Component {
  foucs() {
    console.log('focus')
  }

  render() {
    return (<button {...this.props}></button>)
  }
}

const NewPropsFancyButton = logProps(PropsFancyButton)

// 转发refs到内部组件
function forwardLogProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props', prevProps)
      console.log('new props', this.props)
    }

    render() {
      const {forwardRef, ...rest} = this.props
      console.log(rest , 'rest')
      return (<Component ref={forwardRef} {...rest} />)
    }
  }

  return React.forwardRef((props, ref) => {
    return (<LogProps {...props} forwardedRef={ref} />)
  })
}

const NewForwardFancyButton = forwardLogProps(PropsFancyButton)

// 在DevTools中显示自定义名称
function oneName(Component) {
  class LogProps extends React.Component {
    render() {
      const {forwardRef, ...rest} = this.props

      return <Component ref={forwardRef} {...rest}/>
    }
  }

  const WrappedComponent = React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref} />
  })

  return WrappedComponent 
}

const OneRename = oneName(PropsFancyButton)

// 命名渲染函数
function twoName(Component) {
  class LogProps extends React.Component {
    render() {
      const {forwardedRef, ...rest} = this.props

      return (<Component ref={forwardedRef} {...rest}/>)
    }
  }

  const WrappedComponent = React.forwardRef(
    function myFunction(props, ref) {
      return <LogProps {...props} forwardedRef={ref}/>
    }
  )

  return WrappedComponent
}

const TwoRename = twoName(PropsFancyButton)

// 设置函数displayName
function threeName(Component) {
  class LogProps extends React.Component {

    render() {
      const {forwardedRef, ...rest} = this.props

      return (<Component ref={forwardedRef} {...rest}/>)
    }
  }

  function forwardRef(props, ref) {
    return (<LogProps {...props} forwardedRef={ref} />)
  }

  forwardRef.displayName = 'displayName'

  return React.forwardRef(forwardRef)
}

const ThreeRename = threeName(PropsFancyButton)

// ====== Fragments ========
function ChildA() {
  return (<div>childA</div>)
}

function ChildB() {
  return (<div>childB</div>)
}

function ChildC() {
  return (<div>childC</div>)
}

function FragmentCompnent() {
  return (<React.Fragment>
    <ChildA />
    <ChildB />
    <ChildC />
  </React.Fragment>)
}
// 动机
class Table extends React.Component {
  render() {
    return (<table>
      <tr>
        <Columns />
      </tr>
    </table>)
  }
}

class Columns extends React.Component {
  render() {
    return (<div>
      <td>hello</td>
      <td>world</td>
    </div>)
  }
}

// 用法
class FragmentTable extends React.Component {
  render() {
    return (<table>
      <tr>
        <FragmentColumns />
      </tr>
    </table>)
  }
}

class FragmentColumns extends React.Component {
  render() {
    return (<React.Fragment>
      <td>hello</td>
      <td>world</td>
    </React.Fragment>)
  }
}

// 短语法
class ShortTable extends React.Component {
  render() {
    return (<table>
      <tr>
        <ShortFragment />
      </tr>
    </table>)
  }
}
class ShortFragment extends React.Component {
  render() {
    return (<>
      <td>hello</td>
      <td>world</td>
    </>)
  }
}

// 带key的Fragments
class KeyFragment extends React.Component {
  render() {
    return (<dl>
      {this.props.items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>)
  }
}

// 传统组件业务需求
const DataSource = {
  getComments: () => {
    return [{
      name: '李健',
      id: 1
    }, {
      name: '千玺',
      id: 2
    }]
  },
  addChangeListener: (cb) => {
    console.log('addChangeListener')
    cb && cb()
  },
  removeChangeListener: (cb) => {
    console.log('removeChangeListener')
    cb && cb()
  },
  getBlogPost: (id) => {
    const item = [{
      name: '李健',
      id: 1
    }, {
      name: '千玺',
      id: 2
    }].filter(item => item.id === id)[0] || {}

    return item.name
  }
}

function Comment(props) {
  return (<div>{props.comment.name}</div>)
}

function TextBlock(props) {
  return (<div>{props.text}</div>)
}
class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      comments: DataSource.getComments()
    }
  }

  componentDidMount() {
    // 订阅更改
    DataSource.addChangeListener(this.handleChange)
  }

  componentWillUnnmount() {
    // 清除订阅
    DataSource.removeChangeListener(this.handleChange)
  }

  handleChange() {
    // 当数据源更新时，更新组件状态
    this.setState({
      comments: DataSource.getComments()
    })
  }

  render() {
    return (<div>
      {this.state.comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>)
  }
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    }
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange)
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange)
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    })
  }

  render() {
    return (<TextBlock text={this.state.blogPost} />)
  }
}

// HOC
function withSubscription(WrappedComponent, selectData) {
  // 返回一个组件
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)

      this.state = {
        data: selectData(DataSource, props)
      }
    } 

    componentDidMount() {
      // 负责订阅相关操作
      DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange)
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      })
    }

    render() {
      // 使用新数据渲染被包装的组件
      // 可能还会传递其他属性

      return (<WrappedComponent data={this.state.data} {...this.props}/>)
    }
  }
}

const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments())
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id))

// 不要改变原始组件。使用组合。
// 不要试图在HOC中修改组件原型
function hocLogProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log('Current props: ', this.props)
    console.log('Previous props: ', prevProps)
  }

  return InputComponent
}
function InputComponent() {
  return (<input />)
}
const EnhanceHocLogProps = hocLogProps(InputComponent)
// 使用组合的形式
function hocGroupLogProps(InputComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props:', this.props)
      console.log('Previous props:', prevProps)
    }

    render() {
      return (<InputComponent {...this.props}/>)
    }
  }
}

const HocGroupLogProps = hocGroupLogProps(InputComponent)

// 约定：将不相关的props传递给被包裹的组件
function propsComponent(WrappendComponent) {
  return class extends React.Component {
    render() {
      // 过滤掉非此HOC额外的props，且不需要进行透传
      const { extraProp, someStateOrInstanceMethod, ...passThroughProps } = this.props
      // 通常为state的值或实例方法 
      const injectedProp = someStateOrInstanceMethod

      return (
        <WrappendComponent 
          injectedProp={injectedProp}
          {...passThroughProps}
        />
      )
    }
  }
}

const PropsComponent = propsComponent(InputComponent)

// 约定：最大化可组合性
function Demo(props) {
  return <div {...props}/>
}
// 仅接收一个参数
function withRouter(MyComponent) {
  return class extends React.Component {
    render() {
      const {...rest} = this.props

      return <MyComponent {...rest}/>
    }
  }
}
const NavbarWithRouter = withRouter(Demo)
// 接收多个参数
const Relay = {
  createContainer: (MyComponent, config) => {
    return class extends React.Component {
      render() {
        console.log(config, 'config')

        const {...rest} = this.props

        return (<MyComponent {...rest}/>)
      }
    }
  }
}

const config = 'config'

const CommentWithRelay = Relay.createContainer(Demo, config)

// 最常见的HOC签名
class ConnectComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [{
        completd: true,
        item: '李健'
      }, {
        complted: false,
        item: '千玺'
      }],
      visibilityFilter: 'SHOW_ALL'
    }
  }

  render() {
    return (<div>
      {
      this.state.todos.map(item => <div>{item.item}</div>)
    }</div>)
  }
}


const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const getVisibleTodos = (todos = [], filter = 'SHOW_All') => {
  console.log(filter)
  console.log(todos)
  switch (filter) {
    case 'SHOW_All':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completd)
      default: 
        return todos
  }
}

const store = createStore(getVisibleTodos)

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      })
    }
  }
}

const ConnectDemo = connect(mapStateToProps, mapDispatchToProps)(ConnectComponent)

// connect解读
// connect是一个函数，它的返回值是另外一个函数
const temp = connect(mapStateToProps, mapDispatchToProps)
// 返回值为HOC，他会返回已经连接redux store的组件
const CopyConnectDemo = temp(ConnectComponent)

// 约定：包装显示名称以方便轻松调试
function reNameWithSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {
    render() {
      return (<WrappedComponent {...this.props}/>)
    }
  }

  WithSubscription.displayName = `ReNameWithSubscription(${getDisplayName(WrappedComponent)})`

  return WithSubscription
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const NameDemo = reNameWithSubscription(Demo)
// 注意事项
// 不要在render方法中使用HOC
class RenderDemo extends React.Component {
  render() {
    // 每次调用render函数都会创建一个新的NewDemo
    // NewDemo1!== NewDemo2
    const NewDemo = reNameWithSubscription(Demo)
    // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作
    return <NewDemo {...this.props}/>
  }
}

// 务必复制静态方法
function staticMethodDemo(WrappendComponent) {
  WrappendComponent.staticMethod = function() {
    console.log('static-method')
  }
  return class StaticMethodDemo extends React.Component {
    render() {
      return <WrappendComponent {...this.props}/>
    }
  }
}

const StaticMethodDemo = staticMethodDemo(Demo)

// 把静态方法拷贝到容器组件
function copyStaticMethodDemo(WrappendComponent) {
  WrappendComponent.staticMethod = function() {
    console.log('static-method')
  }

  class CopyStaticMethodDemo extends React.Component {
    render() {
      return <WrappendComponent {...this.props}/>
    }
  }

  CopyStaticMethodDemo.staticMethod = WrappendComponent.staticMethod

  return CopyStaticMethodDemo
}

const CopyStaticMethodDemo = copyStaticMethodDemo(Demo)

// 自动拷贝所有非React静态方法
function  autoCopyStaticMethodDemo(WrappendComponent) {
  WrappendComponent.one = function() {
    console.log('one')
  }
  WrappendComponent.two = function() {
    console.log('two')
  }

  class AutoCopyStaticMethodDemo extends React.Component {
    render() {
      return <WrappendComponent {...this.props}/>
    }
  }

  hoistNonReactStatics(AutoCopyStaticMethodDemo, WrappendComponent)

  return AutoCopyStaticMethodDemo
}

const AutoCopyStaticMethodDemo = autoCopyStaticMethodDemo(Demo)

// ======= 与第三方库协同 =========
// 如何解决这个问题
class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el)
    this.$el.fadeIn()
  }

  componentWillUnmount() {
    this.$el.fadeOut('slow')
  }


  render() {
    return (<div ref={el => this.el = el}/>)
  }
}

// 继承jQuery Chosen插件
class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el)
    this.$el.attr('color', 'red')

    this.handleChange = this.handleChange.bind(this)
    this.$el.on('change', this.handleChange)
  }

  componentWillUnmount() {
    this.$el.off('change', this.handleChange)
    this.$el.attr('color', 'green')
  }

  componentDidUpdate(preProps) {
    if(preProps.children !== this.props.children) {
      this.$el.trigger('chisen: updated')
    }
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }
  render() {
    return (<div>
      <select className="Chosen-select" ref={el => this.el = el}>
        {this.props.children}
      </select>
    </div>)
  }
}

function ChosenExample() {
  return (<Chosen onChange={value => console.log(value)}>
    <option>李健</option>
    <option>千玺</option>
  </Chosen>)
}
// 和其他视图库集成
// 利用react替换基于字符串的渲染
// react组件重写
function Button() {
  return <button id="re-btn">react组件重写</button>
}
export default class Advanced extends React.Component {
  componentDidMount() {
    // jquery实现
    $('#jqueryContainer').html('<button id="btn">纯jq实现</button>')
    $('#btn').click(function() {
      alert('hello')
    })
  }
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
      <div className="sub-title">动态Context</div>
      <DynamicTheme />
      <div className="sub-title">在嵌套组件中更新context</div>
      <NestApp />
      <div className="sub-title">消费多个context</div>
      <MuchContextComponent userName="李健" message="很帅"/>
      <div className="sub-title">注意事项</div>
      <RenderApp />
      <StateApp />
      <div className="title">错误边界</div>
      <div className="sub-title">错误边界</div>
      <div className="des">注意：错误边界无法捕捉以下几种场景中的错误</div>
      <div className="des">1.事件处理</div>
      <div className="des">2.定时器等异步函数</div>
      <div className="des">3.服务端渲染</div>
      <div className="des">4.自身抛出的错误</div>
      <ErrorApp />
      <div className="sub-title">关于try/catch</div>
      <div className="des">trt{'{}'}catch(e) {'{}'}，仅能用于命令式代码</div>
      <div className="des">react组件是声明式的, {'<Button />'}</div>
      <div className="sub-title">关于事件处理器</div>
      <div className="des">如果需要在事件处理器内部捕获错误，使用普通的javascript try/catch 语句</div>
      <TryCatchComponent />
      <div className="sub-title">自React15的命名更改</div>
      <div className="des">React15中有unstable_handleError方法支持错误边界，自从react 16beta发布需要修改为componentDidcatch。</div>
      <div className="des"><a href="https://github.com/reactjs/react-codemod#error-boundaries">codemod</a>帮助自动迁移代码，</div>
      <div className="title">refs转发</div>
      <div className="sub-title">转发refs到DOM组件</div>
      <FancyButton>渲染原生DOM元素的组件</FancyButton>
      <RefsFancyButton ref={ref}>转发ref</RefsFancyButton>
      <div className="sub-title">在高阶组件中转发refs</div>
      <div className="des">这个技巧对高阶组件（HOC）特别有用</div>
      <NewPropsFancyButton 
        label="click me"
        ref={ref}
        onClick={() => console.log(ref)}
      >
        在高阶组件中转发refs
      </NewPropsFancyButton>
      <NewForwardFancyButton
        ref={ref}
        onClick={() => {
          console.log(ref, 'ref')
        }}
      >
        转发refs到内部组件
      </NewForwardFancyButton>
      <div className="sub-title">在DevTools中显示自定义名称</div>
      <OneRename>
        第一种重命名:ForwardedRef
      </OneRename>
      <TwoRename>
        第二种重命名：命名渲染函数
      </TwoRename>
      <ThreeRename>
        第三种重命名：displayName
      </ThreeRename>
      <div className="title">Fragments</div>
      <div className="des">Fragments允许将子列表分组，而无需向DOM添加额外节点</div>
      <FragmentCompnent />
      <div className="sub-title">动机</div>
      <div className="des">组件返回一个子元素列表</div>
      <Table />
      <div className="sub-title">用法</div>
      <FragmentTable />
      <div className="sub-title">短语法</div>
      <ShortTable />
      <div className="sub-title">带key的Fragments</div>
      <div className="des">key是唯一可以传递给Fragment的属性，传递参数时不能使用短语法</div>
      <KeyFragment 
        items={[{
          term: '李健',
          description: '很帅',
          id: '123'
        }, {
          term: '李健',
          description: '很帅帅',
          id: '456'
        }]}
      />
      <div className="title">高阶组件</div>
      <div className="des">高阶组件的参数是组件，返回值为新组件的函数</div>
      <div className="des">
        const EnhancedComponent = higherOrderComponent(WrappedCompinent)
      </div>
      <div className="sub-title">使用HOC解决横切关注点问题</div>
      <div className="des">传统相似组件</div>
      <CommentList />
      <BlogPost id={1}/>
      <div className="des">HOC</div>
      <CommentListWithSubscription />
      <BlogPostWithSubscription id={1}/>
      <div className="sub-title">不要使用原始组件。使用组合</div>
      <EnhanceHocLogProps name="1"/>
      <HocGroupLogProps />
      <div className="sub-title">约定：将不相关的props传递给被包裹的组件</div>
      <PropsComponent 
        test="test"
        test2="test2"
      />
      <div className="sub-title">约定：最大化可组合性</div>
      <NavbarWithRouter>
        仅接收一个参数,也就是被包裹的组件
      </NavbarWithRouter>
      <CommentWithRelay>
        额外接收配置，用于制定组件数据以来
      </CommentWithRelay>
      <Provider store={store}>
        <div className="des">最常见的HOC签名：connect函数</div>
        <ConnectDemo />
      </Provider>
      <Provider store={store}>
        <div className="des">分开connect</div>
        <CopyConnectDemo />
      </Provider>
      <div className="des">connect函数返回的单参数HOC具有签名Component => Component</div>
      <div className="sub-title">约定：包装显示名称以方便轻松挑事</div>
      <NameDemo>
        包装显示名称以方便调试
      </NameDemo>
      <div className="sub-title">注意事项</div>
      <div className="sub-title">不要在render方法中调用HOC</div>
      <RenderDemo>
        不要在render方法中调用HOC，这不仅仅是性能问题-重新挂载组件会导致该组件及其所有子组件状态丢失
      </RenderDemo>
      <div className="sub-title">务必复制静态方法</div>
      <div className="des">增强组件没有static method</div>
      <div className="des">{typeof StaticMethodDemo.staticMethod}</div>
      <div className="des">{typeof CopyStaticMethodDemo.staticMethod}</div>
      <div className="des">{typeof AutoCopyStaticMethodDemo.one}</div>
      <div className="des">{typeof AutoCopyStaticMethodDemo.two}</div>
      <ImportStaticMethod>
        额外导出静态方法
      </ImportStaticMethod>
      <div className="des">{typeof one}</div>
      <div className="sub-title">Refs不会被传递</div>
      <div className="des">虽然高阶组件的约定是将所有props传递给被包装组件，但这对于refs并不适用。因为ref实际上并不是一个prop，就像key一样，是由react专门处理的。</div>
      <div className="title">与第三方库协同</div>
      <div className="sub-title">集成带有DOM操作的插件</div>
      <div className="des">避免冲入的最简单方式就是防止React组件更新。你可以渲染无需更新的React组件，比如一个空的{'<div />'}</div>
      <div className="sub-title">如何解决这个问题</div>
      <SomePlugin />
      <div className="sub-title">集成jQuery Chosen插件</div>
      <ChosenExample />
      <div className="sub-title">和其他视图库集成</div>
      <div id="jqueryContainer"></div>
      <Button />
    </div>)
  }
}
