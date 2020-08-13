import { Actions, State } from './types'

const initialState: State = {
  users: []
}

export function rootReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload }
    default:
      return state
  }
}
