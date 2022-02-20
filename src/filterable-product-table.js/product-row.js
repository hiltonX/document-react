import React from 'react'


export default class ProductRow extends React.Component {


  render() {
    return (
      <div>
        <span 
          style={{marginRight: '8px'}}
          className={this.props.stocked === false ? 'red' : null}
        >{this.props.name}</span>
        <span>{this.props.price}</span>
      </div>
    )
  }
}