export enum RoleName{
    ADMIN = "Admin",
    USER = "User"
}

export enum RoleId {
    ADMIN = 1,
    USER = 2
}

export interface IRole  {
    id: number,
    roleName: string
}