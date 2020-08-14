import React from 'react'
import { Typography, Avatar, Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useStyles } from './userStyles'
import IUser from '../../interfaces/User'

interface Filled  {
  skeleton: false
  index: number
  user: IUser
}

interface Skeletoned {
  skeleton: true
  user?: null
  index?: null
}

export type Props = Filled | Skeletoned

export const User: React.FC<Props> = ({ user, index, skeleton }) => {
  const classes = useStyles()
  const firstname = user?.firstname || ''
  const lastname = user?.lastname || ''
  const email = user?.email || ''
  const avatarText = (firstname.charAt(0) + lastname.charAt(0)).toUpperCase()

  return (
    <Paper className={classes.root} elevation={3} square>
      <div className={classes.counter}>
        <Typography color="textSecondary" variant="h4">
          {skeleton ? '' : `#${index}`}
        </Typography>
      </div>
      <div className={classes.avatarWrapper}>
        {skeleton ? (
          <Skeleton variant="circle">
            <Avatar className={classes.avatar} />
          </Skeleton>
        ) : (
          <Avatar className={classes.avatar}>{avatarText}</Avatar>
        )}
      </div>
      <div className={classes.names}>
        <Typography>{skeleton ? <Skeleton /> : `${firstname} ${lastname}`}</Typography>
        <Typography variant="caption" color="textSecondary" className={classes.email}>
          {skeleton ? <Skeleton /> : email}
        </Typography>
      </div>
    </Paper>
  )
}
