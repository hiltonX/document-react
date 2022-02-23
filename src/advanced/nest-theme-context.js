import React from 'react'

export const nestThemes = {
  red: {
    background: 'red'
  },
  white: {
    background: 'white'
  }
}


export const NestThemesContext = React.createContext({
  theme: nestThemes.red,
  toggleThemes: () => {alert('默认context')}
})