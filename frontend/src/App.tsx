import React, { useState, useEffect } from 'react'
import { User } from './components/user/UserItem'
import { Container, Grid } from '@material-ui/core'
import IUser from '@interfaces/User'
import { AddUserButton } from './components/user/AddUserButton'
import { UserModal } from './components/user/UserModal'
import { fetchUsersAction } from './store/actions'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import { State } from './store/types'

interface ownProps {}

interface stateProps {
  users: IUser[]
}

interface dispatchProps {
  fetchUsers: () => void
}

type Props = stateProps & ownProps & dispatchProps

const mapState: MapStateToProps<stateProps, ownProps, State> = state => {
  return { users: state.users }
}

const mapDispatch: MapDispatchToProps<dispatchProps, ownProps> = dispatch => {
  return { fetchUsers: () => dispatch(fetchUsersAction() as any) }
}

const connector = connect(mapState, mapDispatch)

const App: React.FC<Props> = ({ users, fetchUsers }) => {
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  // const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    setTimeout(() => {}, 1000)
  }, [modalOpen])

  const onSave = async (newUser: IUser) => {
    // try {
    //   const responce = await pushUser(newUser)
    //   setUsers(oldState => [...oldState, responce as IUser])
    //   setModalOpen(false)
    // } catch (err) {
    //   console.error(err)
    // }
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

export default connector(App)
