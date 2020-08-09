import React from 'react'
import { User } from './components/user/User'
import { Container, Grid } from '@material-ui/core'
import { AddUser } from './components/user/AddUser'

const users = [
  { firstname: 'John', lastname: 'snow', email: 'js@nam.rt' },
  { firstname: 'Anne', lastname: 'Marie', email: 'ena@spoti.fy' },
  { firstname: '', lastname: '', email: '' },
]

export const App: React.FC = () => (
  <Container fixed>
    <Grid container spacing={2}>
      {users.map((user, idx) => (
        <Grid key={user.email} item>
          <User {...user} index={++idx} />
        </Grid>
      ))}
      <Grid item>
        <AddUser onClick={console.log} />
      </Grid>
    </Grid>
  </Container>
)
