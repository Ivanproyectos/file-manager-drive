
export interface IFolder {
    id: number;
    name: string;
    parentId: number;
    usersId: number[];
}

export type CreateFolder = Omit<IFolder, 'id'> 
