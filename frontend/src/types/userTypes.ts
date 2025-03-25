import { CreatePerson, IPeopleList } from "@/types";

export interface IUser {
  id: number;
  userName: string;
  status?: boolean
  people: IPeopleList;
}

export interface IUserSummary {
  id: number;
  name: string;
  email: string;
  personType: string;
}
export type CreateUser = Omit<IUser, "id" | "userName" | "people"> & {
  password: string;
  confirmPassword: string;
  people: CreatePerson
}


