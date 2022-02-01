import React from 'react'
import ReactDOM from 'react-dom'

function formatName(user) {
  return user.firstName + ' ' + user.lastName
}

const user = {
  firstName: '大',
  lastName: '姐姐1'
}

const element = (
  <h1>
    hello, {formatName(user)}
  </h1>
)

ReactDOM.render(
  element,
  document.getElementById('root')
)

