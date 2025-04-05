
export interface IFolder {
    id: number;
    name: string;
    size: number;
    status: boolean
    createdDate: string;
    description ?: string;
    users: IUserFolder[];
}
export interface IFolderById {
    id: number;
    name: string;
    description ?: string;
}
export interface IUserFolder {
    name: string;
    email: string;
}

export interface ISubFolder {
    id: number;
    folderId: number;
    name: string;
}



export type CreateFolder = Omit<IFolder, 'id' | 'parentId' | 'users'> & {
    asignedFolder: boolean
    folderPermissions: IFolderPermission[];
}

export interface IFolderPermission {
    userId: number
    expirationDate?: string | null
    canView: boolean
    canDownload: boolean
    isDateExpired: boolean
}

export type ICreateSubFolder = Omit<ISubFolder, 'id'> & {
    description: string
}
