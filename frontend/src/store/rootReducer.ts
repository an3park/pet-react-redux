import { combineReducers } from 'redux'
import { usersReducer, usersActions } from './usersReducer'

export const rootReducer = combineReducers({ users: usersReducer })

export type RootState = ReturnType<typeof rootReducer>
export type RootActions = usersActions