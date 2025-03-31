export interface IUserFile{
    id: number,
    fileName: string,
    extension: string,
    sizeBytes: number,
    createdDate: string,
    canView: boolean,
    canDownload: boolean,
    expirationDate: string
}