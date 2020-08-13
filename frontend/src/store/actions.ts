import IUser from '@interfaces/User'
import ky from 'ky'
import { ThunkAction } from 'redux-thunk'
import { State, Actions } from './types'
import { Action } from 'redux'

const BASE_URL = 'http://127.0.0.1:3000'

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Actions>

export function fetchUsersAction(): AppThunk<void> {
  return async dispatch => {
    const users: IUser[] = await ky.get(BASE_URL + '/api/user').json()
    dispatch({ type: 'FETCH_USERS', payload: users })
  }
}
