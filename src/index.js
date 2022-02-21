import React from 'react'
import ReactDOM from 'react-dom'
// 核心概念
import Concept from './concept'

import './index.css'


const list = [
  {title: '核心概念', key: 'concept'},
]

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      key: 'concept'
    }
  }

  render() {
    return (<div className="FBH">
      <div className="w150">
        {list.map(item => <p><a href="#" onClick={() => this.setState({key: item.key})}>{item.title}</a></p>)}
      </div>
      <div className="FB1">
        {this.state.key === 'concept' && <Concept />}
      </div>
    </div>)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


