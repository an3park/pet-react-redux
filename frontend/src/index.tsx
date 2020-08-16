import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Provider } from 'react-redux'
import 'fontsource-roboto'

import { theme } from './theme'
import App from './App'
import { store } from './store/store'

const app = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)

render(app, document.getElementById('app'))
