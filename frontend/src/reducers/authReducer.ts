import { IUserInfoPayload, LoginActionTypes, LoginType } from "@/types";

export const authReducer = (state: IUserInfoPayload, action: LoginActionTypes) => {
    switch (action.type) {
        case LoginType.LOGIN:
            return {...state, ...action.payload};
        case LoginType.LOGOUT:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

