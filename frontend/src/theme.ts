import { grey } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          boxSizing: 'border-box'
        },
        body: { paddingTop: '2rem' }
      }
    }
  },
  palette: {
    text: { secondary: grey[400] }
  }
})
