import React, {Fragment} from 'react'

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
    </div>)
  }
}
