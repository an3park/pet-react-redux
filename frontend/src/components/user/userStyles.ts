import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: theme.spacing(42),
      height: theme.spacing(11),
      paddingRight: theme.spacing(1)
    },
    counter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      flexBasis: theme.spacing(9),
      flexShrink: 0,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1)
    },
    avatarWrapper: {
      flexShrink: 0,
      margin: theme.spacing(0, 2)
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      backgroundColor: deepPurple[500],
      color: theme.palette.getContrastText(deepPurple[500])
    },
    names: {
      overflow: 'hidden',
      minWidth: theme.spacing(20)
    },
    email: {
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    adduser: {
      justifyContent: 'center',
      borderWidth: 3,
      borderStyle: 'dashed',
      borderColor: theme.palette.text.secondary,
      cursor: 'pointer',
      userSelect: 'none'
    }
  })
})
