import React from 'react'

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

export default class Advanced extends React.Component {

  render() {
    return (<div>
      <div className="title">无障碍</div>
      <div className="sub-title">无障碍辅助功能</div>
      <div className="des">无障碍辅助功能是使得辅助技术正确解读网页的必要条件</div>
      <div className="sub-title">标准和指南</div>
      <Input />
    </div>)
  }
}
