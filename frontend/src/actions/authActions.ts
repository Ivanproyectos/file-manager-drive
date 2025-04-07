import { IUserInfoPayload, LoginActionTypes, LoginType } from "@/types";

export const authLogin = (payload: IUserInfoPayload) : LoginActionTypes => ({
  type: LoginType.LOGIN,
  payload
});
export const authLogout = (payload: IUserInfoPayload) : LoginActionTypes => ({
  type: LoginType.LOGOUT,
  payload
});
