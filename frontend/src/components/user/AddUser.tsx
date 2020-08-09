import React, { MouseEvent } from 'react'
import { useStyles } from './userStyles'
import { Typography } from '@material-ui/core'

export interface Props {
  onClick?: (event: MouseEvent) => void
}

export const AddUser: React.FC<Props> = ({ onClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.root + ' ' + classes.adduser} onClick={onClick}>
      <Typography variant="h4" color="textSecondary">
        +
      </Typography>
    </div>
  )
}
