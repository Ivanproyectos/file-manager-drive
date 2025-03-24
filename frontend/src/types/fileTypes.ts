export interface IFile {
    id: number;
    fileName: string;
    sizeBytes: number;
    SizeBytes: number;
}

export interface ICreateFile  {
    folderId: number;
    uploadId: string;
    filePermissions: IUserFilePermission[]

}

export interface IUserFilePermission {
    userId: number, 
    name: string
    email: string
    expirationDate: string
    canView: boolean
    canDownload: boolean
  }
  