import React, { MouseEvent } from 'react'
import { useStyles } from './userStyles'
import { Typography, Button } from '@material-ui/core'

export interface Props {
  onClick?: (event: MouseEvent) => void
}

export const AddUserButton: React.FC<Props> = ({ onClick }) => {
  const classes = useStyles()

  return (
    <Button className={classes.root + ' ' + classes.adduser} onClick={onClick}>
      <Typography variant="h4" color="textSecondary">
        +
      </Typography>
    </Button>
  )
}
