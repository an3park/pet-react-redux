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

export type usersActions = fetchUsersAction | setLoading | saveNewUser

type usersState = typeof initialState

export function usersReducer(state = initialState, action: usersActions): usersState {
  switch (action.type) {
    case 'USERS/FETCH':
      return { ...state, users: action.payload }
    case 'USERS/LOADING':
      return { ...state, loading: action.payload }
    case 'USERS/ADD':
      return {...state, users: [...state.users, action.payload]}
    default:
      return state
  }
}
