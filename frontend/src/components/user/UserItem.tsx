import React from 'react'
import { Typography, Avatar, Paper, Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useStyles } from './userStyles'
import IUser from '../../interfaces/User'

interface Skelet {
  skeleton: true
}

interface Filled {
  skeleton: false
  index: number
  user: IUser
  onClose: (userId: string) => void
}

export type Props = Skelet | Filled

export const User: React.FC<Props> = props => {
  const classes = useStyles()

  let firstname, lastname, email, avatarText, onCloseClick
  if (!props.skeleton) {
    firstname = props.user.firstname
    lastname = props.user.lastname
    email = props.user.email
    avatarText = (firstname.charAt(0) + lastname.charAt(0)).toUpperCase()

    onCloseClick = (): void => {
      if (props.user._id) {
        props.onClose(props.user._id)
      }
    }
  }

  return (
    <Paper className={classes.root} elevation={3} square>
      <div className={classes.counter}>
        <Typography color="textSecondary" variant="h4">
          {props.skeleton ? '' : `#${props.index}`}
        </Typography>
      </div>
      <div className={classes.avatarWrapper}>
        {props.skeleton ? (
          <Skeleton variant="circle">
            <Avatar className={classes.avatar} />
          </Skeleton>
        ) : (
          <Avatar className={classes.avatar}>{avatarText}</Avatar>
        )}
      </div>
      <div className={classes.names}>
        <Typography>
          {props.skeleton ? <Skeleton /> : `${firstname} ${lastname}`}
        </Typography>
        <Typography variant="caption" color="textSecondary" className={classes.email}>
          {props.skeleton ? <Skeleton /> : email}
        </Typography>
      </div>
      {onCloseClick && (
        <Button onClick={onCloseClick} className={classes.cross}>
          &times;
        </Button>
      )}
    </Paper>
  )
}
