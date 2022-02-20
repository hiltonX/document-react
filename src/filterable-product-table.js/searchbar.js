import React from 'react'

export default class SearchBar extends React.Component {

  render() {
    return (<div>
      <input placeholder="search....."/>
      <div>
        <input type="checkbox"/>
        Only show product in stock
      </div>
    </div>)
  }

}