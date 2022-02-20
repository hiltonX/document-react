import React from 'react'

import ProductCategory from './product-category-row'
import ProductRow from './product-row.js'
  
const productList = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

export default class ProductTable extends React.Component {


  render() {
    return (<div>
      <ProductCategory 
        title="Sporting Goods"
      />
      {productList.filter(item => item.category === 'Sporting Goods').map(item => (
        <ProductRow 
          name={item.name}
          price={item.price}
          stocked={item.stocked}
        />
      ))}
      <ProductCategory 
        title="Electronics"
      />
       {productList.filter(item => item.category === 'Electronics').map(item => (
        <ProductRow 
          name={item.name}
          price={item.price}
          stocked={item.stocked}
        />
      ))}
    </div>)
  }
}