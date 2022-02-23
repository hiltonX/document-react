import React from 'react'
import {DynamicThemeContext} from './theme-context'

class ThemedButton extends React.Component {
  
  render() {
    const {props} = this
    const theme = this.context


    return (<button 
      {...props}
      style={{backgroundColor: theme.background}}
    />)
  }
}

ThemedButton.contextType = DynamicThemeContext

export default ThemedButton