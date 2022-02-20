import React from 'react'

export default class ProductCategory extends React.Component {
  
  render() {
    return (<div>
        <b>
          {this.props.title}
        </b>
      </div>)
  }
}