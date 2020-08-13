import IUser from '@interfaces/User'

interface fetchUsersAction {
  type: 'FETCH_USERS'
  payload: IUser[]
}

export interface State {
  users: IUser[]
}

export type Actions = fetchUsersAction
