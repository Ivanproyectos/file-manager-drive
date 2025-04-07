import { IFolderPermission, UserAction, UserActionTypes } from "@/types";

/* export const initialState: { users: IFolderPermission[] | [] } = {
    users: []
}
 */
export const userFilePermissionReducer = (state: { users: IFolderPermission[] | [] }, action: UserActionTypes): { users: IFolderPermission[] | [] } => {
    switch (action.type) {
        case UserAction.ADD_USER:
            return { ...state, users: [...state.users, action.payload] }
        case UserAction.ADD_USERS:
            return { ...state, users: action.payload }
        case UserAction.UPDATE_USER:
            return {
                ...state,
                users: state.users.map<IFolderPermission>(user => user.userId === action.payload.userId ? action.payload : user)
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