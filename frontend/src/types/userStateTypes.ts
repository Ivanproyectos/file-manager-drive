import { IFolderPermission } from "@/types";
export enum UserAction {
    ADD_USER = 'ADD_USER',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER',
  }
  
  interface AddUserAction {
    type: typeof UserAction.ADD_USER;
    payload: IFolderPermission;
  }
  
  interface UpdateUserAction {
    type: typeof UserAction.UPDATE_USER;
    payload: IFolderPermission;
  }
  
  interface DeleteUserAction {
    type: typeof UserAction.DELETE_USER;
    payload: number; 
  }
  
  export type UserActionTypes = AddUserAction | UpdateUserAction | DeleteUserAction;