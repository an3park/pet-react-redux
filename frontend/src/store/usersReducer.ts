import IUser from '../interfaces/User'

const initialState = {
  users: [] as IUser[],
  loading: true
}

interface fetchUsersAction {
  type: 'USERS/FETCH'
  payload: IUser[]
}

interface setLoading {
  type: 'USERS/LOADING'
  payload: boolean
}

interface saveNewUser {
  type: 'USERS/ADD'
  payload: IUser
}

interface deleteUser {
  type: 'USERS/DELETE'
  payload: string
}

export type usersActions = fetchUsersAction | setLoading | saveNewUser | deleteUser

type usersState = typeof initialState

export function usersReducer(state = initialState, action: usersActions): usersState {
  switch (action.type) {
    case 'USERS/FETCH':
      return { ...state, users: action.payload }
    case 'USERS/LOADING':
      return { ...state, loading: action.payload }
    case 'USERS/ADD':
      return { ...state, users: [...state.users, action.payload] }
    case 'USERS/DELETE':
      const users = state.users.filter(u => u._id !== action.payload)
      return { ...state, users }
    default:
      return state
  }
}
