import { IUserFilePermission, UserAction, UserActionTypes } from "@/types";

export const initialState: { users: IUserFilePermission[] | [] } = {
    users: []
}

export const userFilePermissionReducer = (state = initialState, action: UserActionTypes ) : { users: IUserFilePermission[] | [] } => {
    switch(action.type) {
        case UserAction.ADD_USER:
            return { ...state, users: [...state.users, action.payload] }
        case UserAction.UPDATE_USER:
            return { 
                ...state,
                users: state.users.map<IUserFilePermission>(user => user.userId === action.payload.userId ? action.payload : user)
            }
        case UserAction.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.userId !== action.payload)
            }
        default:
            return state
    }
 }