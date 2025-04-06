export interface IUserFolderPermission {
    id?: number
    name?: string
    email?: string
    userId: number
    expirationDate?: string | null
    canView: boolean
    canDownload: boolean
    isDateExpired: boolean
}

export type CreateFolderPermission = Omit<IUserFolderPermission, 'id'>


export interface UpdateFolderPermission extends IUserFolderPermission {
    id: number
}
