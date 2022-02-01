import React from 'react'
import ReactDOM from 'react-dom'

const name = '大姐姐'
const element = <h1>hello, {name}</h1>

ReactDOM.render(
  element,
  document.getElementById('root')
)

