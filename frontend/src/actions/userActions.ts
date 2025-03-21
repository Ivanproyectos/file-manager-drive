import {  IUserFilePermission, UserAction, UserActionTypes } from '@/types';

export const addUser = (user: IUserFilePermission) : UserActionTypes => ({
  type: UserAction.ADD_USER,
  payload: user,
});

export const updateUser = (user: IUserFilePermission) : UserActionTypes => ({
  type: UserAction.UPDATE_USER,
  payload: user,
});

export const deleteUser = (userId: number)  : UserActionTypes => ({
  type: UserAction.DELETE_USER,
  payload: userId,
});