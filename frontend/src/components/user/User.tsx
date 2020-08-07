import React from 'react'
import { Typography, Avatar, Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useStyles } from './userStyles'

export interface Props {
  firstname: string
  lastname: string
  email: string
  index: number
}

export const User: React.FC<Props> = ({ firstname, lastname, email, index }) => {
  const classes = useStyles()
  const avatarText = (firstname.charAt(0) + lastname.charAt(0)).toUpperCase()
  const loading = !Boolean(firstname + lastname + email)

  return (
    <Paper className={classes.root} elevation={3} square>
      <div className={classes.counter}>
        <Typography color="textSecondary" variant="h4">
          {loading ? '' : `#${index}`}
        </Typography>
      </div>
      <div className={classes.avatarWrapper}>
        {loading ? (
          <Skeleton variant="circle">
            <Avatar className={classes.avatar} />
          </Skeleton>
        ) : (
          <Avatar className={classes.avatar}>{avatarText}</Avatar>
        )}
      </div>
      <div className={classes.names}>
        <Typography>{loading ? <Skeleton /> : `${firstname} ${lastname}`}</Typography>
        <Typography variant="caption" color="textSecondary" className={classes.email}>
          {loading ? <Skeleton /> : email}
        </Typography>
      </div>
    </Paper>
  )
}
