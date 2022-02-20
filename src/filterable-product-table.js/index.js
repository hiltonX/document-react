import React from 'react'
import SearchBar from './searchbar.js'
import ProductTable from './product-table.js'

import './index.css'

export default class FilterableProductTable extends React.Component {

  render() {
    return (<div>
      <SearchBar />
      <ProductTable />
    </div>)
  }
}