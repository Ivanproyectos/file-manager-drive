import { CreatePerson } from "@/types";

export interface IUser {
  id: number;
  userName: string;
  password: string;
  confirmPassword: string;
  people: CreatePerson;
}

export type CreateUser = Omit<IUser, "id" | "userName">;
