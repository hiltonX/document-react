import React from 'react'

export default class SearchBar extends React.Component {

  render() {
    return (<div>
      <input 
        placeholder="search....."
        onChange={(e) => this.props.changeKeyWord(e.target.value)}  
      />
      <div>
        <input 
          type="checkbox" 
          onChange={(e) => this.props.changeChecked(e.target.checked)}  
        />
        Only show product in stock
      </div>
    </div>)
  }

}