import axios from 'axios'
import { ILogin, IUserToken, IUser } from '@/types'

export const loginAsync = async (user: ILogin): Promise<IUserToken> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/account/auth`,
    user
  )
  return response.data
}
export const getUserById = async (userId: number): Promise<IUser> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/account/users/${userId}`
  )
  return response.data
}
