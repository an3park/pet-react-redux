import ky from 'ky'
import IUser from '@interfaces/User'

const BASE_URL = 'http://127.0.0.1:3000'

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
