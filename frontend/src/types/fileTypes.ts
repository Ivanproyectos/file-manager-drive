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
    id: number, 
    name: string
    email: string
    expirationDate: string | Date
    canView: boolean
    canDownload: boolean
  }
  