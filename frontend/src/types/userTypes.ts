import { CreatePerson, Person } from "@/types";

export interface IUser {
  id?: number;
  userName: string;
  password: string;
  status?: boolean
  people: Person;
  roles: string[];
}

export interface IUserSummary {
  id: number;
  name: string;
  email: string;
  personType: string;
}
export type CreateUser = Omit<IUser, "id" | "userName" | "people"> & {
  confirmPassword: string;
  people: CreatePerson
}

export type UpdateUser = Omit<IUser, "status"| "password"| "userName" | "people"> & {
  people: CreatePerson
}


