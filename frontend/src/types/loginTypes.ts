export interface ILogin{
    email: string,
    password: string
}

export interface IUserToken{
    userId: number
    expiresIn: number
    token: string,
    refreshToken: string
}
export interface IUserSession{
    id?: number,
    name: string,
    email: string,
    personType: string
}