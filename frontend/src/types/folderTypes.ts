
export interface IFolder {
    id: number;
    name: string;
    size: number;
    dateCreated: Date;
    description ?: string;
    users: [];
}

export type CreateFolder = Omit<IFolder, 'id' | 'parentId' | 'users'> & {
    usersId: number[];
}
