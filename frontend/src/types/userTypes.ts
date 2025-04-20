import { CreatePerson, Person, IRole } from "@/types";

export interface IUser {
  id?: number;
  userName: string;
  /* password: string; */
  status?: boolean
  people: Person;
  isExpired: boolean
  expirationDate?: string | null;
  roles?: IRole[];
}

export interface IUserSummary {
  id: number;
  name: string;
  email: string;
  personType: string;
}
export type CreateUser = Omit<IUser, "id" | "userName" | "people" | "roles" | "status"> & {
  /* confirmPassword: string; */
  people: CreatePerson
  roles?: number[];
}

export type UpdateUser = Omit<IUser, "status"| "password"| "userName" | "people" | "roles" > & {
  people: CreatePerson
  roles?: number[];
}


