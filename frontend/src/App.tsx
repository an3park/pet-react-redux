import React, { useState, useEffect } from 'react'
import { User } from './components/user/UserItem'
import { Container, Grid } from '@material-ui/core'
import IUser from './interfaces/User'
import { AddUserButton } from './components/user/AddUserButton'
import { UserModal } from './components/user/UserModal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/rootReducer'
import { fetchUsersAction, saveNewUser } from './store/usersActions'

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const users = useSelector<RootState, IUser[]>(state => state.users.users)
  const loading = useSelector<RootState, boolean>(state => state.users.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsersAction())
  }, [])

  const onSave = (newUser: IUser) => {
    dispatch(saveNewUser(newUser))
    setModalOpen(false)
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {loading
          ? new Array(4).fill(null).map((_, key) => (
              <Grid key={key} item>
                <User skeleton />
              </Grid>
            ))
          : users.map((user, idx) => (
              <Grid key={user.email} item>
                <User skeleton={false} user={user} index={idx + 1} />
              </Grid>
            ))}
        {!loading && (
          <Grid item>
            <AddUserButton onClick={() => setModalOpen(true)} />
          </Grid>
        )}
      </Grid>
      {modalOpen && <UserModal onClose={() => setModalOpen(false)} onSave={onSave} />}
    </Container>
  )
}

export default App
