import {  IFolderPermission, UserAction, UserActionTypes } from '@/types';

export const addUser = (user: IFolderPermission) : UserActionTypes => ({
  type: UserAction.ADD_USER,
  payload: user,
});
export const addUsers = (user: IFolderPermission[]) : UserActionTypes => ({
  type: UserAction.ADD_USERS,
  payload: user,
});


export const updateUser = (user: IFolderPermission) : UserActionTypes => ({
  type: UserAction.UPDATE_USER,
  payload: user,
});

export const deleteUser = (userId: number)  : UserActionTypes => ({
  type: UserAction.DELETE_USER,
  payload: userId,
});