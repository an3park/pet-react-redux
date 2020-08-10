import ky from 'ky'
import IUser from '@interfaces/User'

const BASE_URL = ''

export async function fetchUsers() {
  const users: IUser[] = await ky.get(BASE_URL + '/api/user').json()
  return users
}

export async function pushUser(user: IUser) {
  const resUser: IUser = await ky
    .post(BASE_URL + '/api/user', {
      json: user
    })
    .json()
  return resUser
}
