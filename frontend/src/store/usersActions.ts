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
    dispatch(setLoading(true))
    const users: IUser[] = await ky.get('/api/user').json()
    dispatch({ type: 'USERS/FETCH', payload: users })
    dispatch(setLoading(false))
  }
}

export function saveNewUser(user: IUser): AppThunk {
  return async dispatch => {
    const resUser: IUser = await ky
      .post('/api/user', {
        json: user
      })
      .json()
    dispatch({ type: 'USERS/ADD', payload: resUser })
  }
}
