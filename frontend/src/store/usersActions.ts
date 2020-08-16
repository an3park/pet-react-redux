import IUser from '../interfaces/User'
import ky from 'ky'
import { ThunkAction } from 'redux-thunk'
import { RootState, RootActions } from './rootReducer'

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootActions
>

export function setLoading(loading: boolean): RootActions {
  return { type: 'USERS/LOADING', payload: loading }
}

export function fetchUsersAction(): AppThunk<void> {
  return async dispatch => {
    try {
      dispatch(setLoading(true))
      const users: IUser[] = await ky.get('/api/user').json()
      dispatch({ type: 'USERS/FETCH', payload: users })
      dispatch(setLoading(false))
    } catch (err) {
      console.error(err.message || err)
    }
  }
}

export function saveNewUser(user: IUser): AppThunk {
  return async dispatch => {
    try {
      const resUser: IUser = await ky
        .post('/api/user', {
          json: user
        })
        .json()
      dispatch({ type: 'USERS/ADD', payload: resUser })
    } catch (err) {
      console.error(err.message || err)
    }
  }
}

export function deleteUser(userId: string): AppThunk {
  return async dispatch => {
    try {
      const searchParams = { id: userId }
      await ky.delete('/api/user', { searchParams }).json()
      dispatch({ type: 'USERS/DELETE', payload: userId })
    } catch (err) {
      console.error(err.message || err)
    }
  }
}
