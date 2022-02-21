import React from 'react'
import ReactDOM from 'react-dom'

import Concept from './concept'

import './index.css'

let key = 'concept'

const list = [
  {title: '核心概念', key: 'concept'}
]

ReactDOM.render(
  <div className="FBH">
    <div className="w150">
      {list.map(item => <a href="#" onClick={() => key = item.key}>{item.title}</a>)}
    </div>
    <div className="FB1">
      {key === 'concept' && <Concept />}
    </div>
  </div>,
  document.getElementById('root')
)


