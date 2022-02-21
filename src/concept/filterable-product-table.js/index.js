import React from 'react'
import SearchBar from './searchbar.js'
import ProductTable from './product-table.js'

import './index.css'

const productList = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

export default class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      keyword: '',
      isOnlyShowStock: false
    }
  }

  changeKeyWord = (value) => {
    this.setState({
      keyword: value
    })
  }

  changeChecked = (value) => {
    this.setState({
      isOnlyShowStock: value
    })
  }

  getProductList = () => {
    if(this.state.keyword === '') {
      return this.state.isOnlyShowStock ? productList.filter(item => item.stocked) : productList
    }

    return this.state.isOnlyShowStock ? productList.filter(item => item.stocked && item.name.includes(this.state.keyword)) : productList.filter(item => item.name.includes(this.state.keyword))
  }

  render() {
    return (<div>
      <SearchBar 
        isOnlyShowStock={this.state.isOnlyShowStock}
        keyword={this.state.keyword}
        changeKeyWord={this.changeKeyWord}
        changeChecked={this.changeChecked}
      />
      <ProductTable 
        isOnlyShowStock={this.state.isOnlyShowStock}
        productList={this.getProductList()}
      />
    </div>)
  }
}