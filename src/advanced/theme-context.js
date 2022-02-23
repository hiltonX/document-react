import React from 'react'
export const themes = {
  light: {
    foreground: '#000',
    background: '#eee',
  },
  dark: {
    foreground: '#fff',
    background: '#222'
  }
}

export const DynamicThemeContext = React.createContext(themes.dark)