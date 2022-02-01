import React from 'react'
import ReactDOM from 'react-dom'


function formatName(user) {
  return user.firstName + ' ' + user.lastName
}

const user = {
  firstName: '大',
  lastName: '姐姐1'
}

function getGreenting(user) {
  if (user) {
    return <h1>hello, {formatName(user)}</h1>
  }

  return <h1>hello, 没有user</h1>
}


ReactDOM.render(
  getGreenting(user),
  document.getElementById('root')
)

