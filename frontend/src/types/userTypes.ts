import { CreatePerson, Person } from "@/types";

export interface IUser {
  id: number;
  userName: string;
  password: string;
  confirmPassword: string;
  people: Person;
}

export interface IUserSummary {
  id: number;
  name: string;
  email: string;
  personType: string;
}
export type CreateUser = Omit<IUser, "id" | "userName" | "people"> & {
  people: CreatePerson
}

export interface IUserFilePermission {
  id: number, 
  name: string
  email: string
  canView: boolean
  canDownload: boolean
}

