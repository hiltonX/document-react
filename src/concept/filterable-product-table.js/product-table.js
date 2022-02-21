import React from 'react'

import ProductCategory from './product-category-row'
import ProductRow from './product-row.js'
  


export default class ProductTable extends React.Component {


  render() {
    return (<div>
      <ProductCategory 
        title="Sporting Goods"
      />
      {this.props.productList.filter(item => item.category === 'Sporting Goods').map(item => (
        <ProductRow 
          key={item.name}
          name={item.name}
          price={item.price}
          stocked={item.stocked}
        />
      ))}
      <ProductCategory 
        title="Electronics"
      />
       {this.props.productList.filter(item => item.category === 'Electronics').map(item => (
        <ProductRow 
          key={item.name}
          name={item.name}
          price={item.price}
          stocked={item.stocked}
        />
      ))}
    </div>)
  }
}