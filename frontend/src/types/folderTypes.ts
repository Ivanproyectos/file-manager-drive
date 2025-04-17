import {
  CreateFolderPermission,
  IUserFolderPermission,
} from './folderPermissionTypes'
export interface IFolder {
  id: number
  name: string
  size: number
  status: boolean
  createdDate: string
  description?: string
  hasProcessState: boolean
  folderProcessHistories: IFolderProcessHistories[]
  users: IUserFolder[]
}
export interface IFolderProcessHistories {
  id: number
  isActive: boolean
  comment?: string
  state: IFolderProcessState
}

export interface IFolderProcessState {
  id: number
  name: string
  description?: string
}

export enum IFolderProcessStatus {
  PENDING = 1,
  PROCESS = 2,
  FINISHED = 3,
}

export interface IFolderById {
  id: number
  name: string
  description?: string
}
export interface IUserFolder {
  name: string
  email: string
}

export interface ISubFolder {
  id: number
  folderId: number
  name: string
  folderProcessHistories: IFolderProcessHistories[]
  folderPermissions: IUserFolderPermission
}

export type CreateFolder = Omit<IFolder, 'id' | 'parentId' | 'users'> & {
  asignedFolder: boolean
  folderPermissions: CreateFolderPermission[]
}
export type ICreateSubFolder = Omit<
  ISubFolder,
  'id' | 'folderProcessHistories' | 'folderPermissions'
> & {
  description: string
}
export interface UpdateFolder {
  id: number
  name: string
  description?: string
  deletedFileIds: number[]
  folderPermissions?: IUserFolderPermission[]
}
