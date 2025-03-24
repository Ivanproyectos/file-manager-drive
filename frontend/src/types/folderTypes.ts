
export interface IFolder {
    id: number;
    name: string;
    description ?: string;
    usersId: number[];
}

export type CreateFolder = Omit<IFolder, 'id' | 'parentId'> 
