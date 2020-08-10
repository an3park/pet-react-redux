import React, { useState, useEffect } from 'react'
import { User } from './components/user/UserItem'
import { Container, Grid, Modal } from '@material-ui/core'
import IUser from '@interfaces/User'
import { AddUserButton } from './components/user/AddUserButton'
import { fetchUsers, pushUser } from './ajax'
import { CreateUserModalBody } from './components/user/createUserModalBody'

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers().then(users => {
      setUsers(users as IUser[])
      setLoading(false)
    })
  }, [])

  const onSubmit = async (newUser: IUser) => {
    try {
      const responce = await pushUser(newUser)
      setUsers(oldState => [...oldState, responce as IUser])
      setModalOpen(false)
    } catch (err) {
      console.error(err)
    }
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
        {loading ? null : (
          <Grid item>
            <AddUserButton onClick={() => setModalOpen(true)} />
          </Grid>
        )}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <CreateUserModalBody onSubmit={onSubmit} />
        </Modal>
      </Grid>
    </Container>
  )
}
