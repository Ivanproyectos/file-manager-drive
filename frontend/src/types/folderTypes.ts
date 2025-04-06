import { CreateFolderPermission, UpdateFolderPermission } from "./folderPermissionTypes";
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
    folderPermissions: CreateFolderPermission[];
}
export type ICreateSubFolder = Omit<ISubFolder, 'id'> & {
    description: string
}
export interface UpdateFolder extends CreateFolder {
    deletedFileIds: number[];
    folderPermissions: UpdateFolderPermission[];
    deletePermissionIds: number[]
}

