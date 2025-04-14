import { IFolderPermission, UserAction, UserActionTypes } from "@/types";


export const userFilePermissionReducer = (state: IFolderPermission[], action: UserActionTypes): IFolderPermission[] | [] => {
    switch (action.type) {
        case UserAction.ADD_USER:
            return [...state, action.payload];
        case UserAction.ADD_USERS:
            return action.payload
        case UserAction.UPDATE_USER:
            return state.map<IFolderPermission>(user =>
                 user.userId === action.payload.userId ? action.payload : user)

        case UserAction.DELETE_USER:
            return state.filter(user => user.userId !== action.payload)

        default:
            return state
    }
}