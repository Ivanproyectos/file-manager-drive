
export interface IFolder {
    id: number;
    name: string;
    size: number;
    createdDate: string;
    description ?: string;
    users: IUserFolder[];
}
export interface IUserFolder {
    name: string;
    email: string;
}

export interface ISubFolder {
    id: number;
    FolderId: number;
    name: string;
}



export type CreateFolder = Omit<IFolder, 'id' | 'parentId' | 'users'> & {
    usersId: number[];
}
