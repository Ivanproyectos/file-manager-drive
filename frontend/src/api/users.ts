import { axiosInstance } from './axiosInstance'
import { IUserSummary, IUser, UpdateUser, CreateUser } from '@/types'

export const getUsersSummary = async (): Promise<IUserSummary[]> => {
  const response = await axiosInstance.get('/users/summary')
  return response.data
}

export const getUsers = async (): Promise<IUser[]> => {
  const response = await axiosInstance.get('/users')
  return response.data
}

export const removeUser = async (userId: number): Promise<void> => {
  await axiosInstance.delete(`/users/${userId}`)
}

export const getUserById = async (userId: number): Promise<IUser> => {
  const response = await axiosInstance.get(`/users/${userId}`)
  return response.data
}

export const updateUser = async (user: UpdateUser): Promise<void> => {
  await axiosInstance.put(`/users/${user.id}`, user)
}

export const addUser = async (user: CreateUser): Promise<void> => {
  await axiosInstance.post('/users', user)
}

export const updateStatus = async (id: number): Promise<void> => {
  await axiosInstance.patch(`/users/status/${id}`)
}

export const resetPassword = async (id: number): Promise<void> => {
  await axiosInstance.post('/users/reset-password', id, {
    headers: { 'Content-Type': 'application/json' },
  })
}
