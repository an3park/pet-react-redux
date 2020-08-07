import { render } from 'react-dom'
import React from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from './theme'
import { App } from './App'

import 'fontsource-roboto'

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,

  document.getElementById('app')
)
