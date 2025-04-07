import { IUserSession } from "@/types";

export enum LoginType {
    LOGIN = '[Auth] Login',
    LOGOUT = '[Auth] Logout',
  }
  export interface IUserInfoPayload{
    token: string | null,
    user: IUserSession | null
    isAuthenticated: boolean
}
  
  interface LoginAction {
    type: typeof LoginType.LOGIN;
    payload: IUserInfoPayload;
  }

  interface LogoutAction {
    type: typeof LoginType.LOGOUT;
    payload: IUserInfoPayload;
  }
  
  export type LoginActionTypes = LoginAction | LogoutAction;