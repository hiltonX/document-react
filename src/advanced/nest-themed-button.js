import React from 'react'
import {NestThemesContext} from './nest-theme-context'

function NestThemedButton(props) {
  return (
  <NestThemesContext.Consumer>
    {({theme, toggleThemes}) => (
      <button 
        {...props}
        style={{backgroundColor: theme.background}}
        onClick={toggleThemes}
      >在嵌套组件中更新context</button>
    )}
    
  </NestThemesContext.Consumer>
  )
}

export default NestThemedButton