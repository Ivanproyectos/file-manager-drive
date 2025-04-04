export interface IFile {
    id: number;
    fileName: string;
    extension:  string
    sizeBytes: number;
    createdDate: string;
}

export interface ICreateFile  {
    folderId: number;
    uploadId: string;
    filePermissions?: IUserFilePermission[] | null

}

export interface IUserFilePermission {
    userId: number, 
    name: string
    email: string
    expirationDate?: string | null
    canView: boolean
    canDownload: boolean
    isDateExpired: boolean
  }

export  enum StatusUploadFile {
    LOADING = 0,
    SUCCESS = 1,
    ERROR = 2,
  }

  export interface StatusUploadedFile {
    status: StatusUploadFile;
    files: string[];
  }
  